import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/todo";
import type { Todo } from "@/types/todoType";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Todo> }) =>
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
