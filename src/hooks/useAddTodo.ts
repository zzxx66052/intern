import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Todo } from "@/types/todoType";
import { addTodo } from "@/api/todo";

type AddTodoInput = Omit<Todo, "id">;

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: AddTodoInput) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
