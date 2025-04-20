import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addTodo } from "@/api/todo";
import { Todo } from "@/types/todoType";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Omit<Todo, "id">) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
