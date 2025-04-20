import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/todo";
import type { Todo } from "@/types/todoType";

export const useToggleTodo = (todoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updated: Partial<Todo>) => updateTodo(todoId, updated),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((t) =>
          t.id === todoId ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );

      return { prevTodos };
    },
    onError: (_, __, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
