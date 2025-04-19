import { deleteTodo } from "@/api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export default useDeleteTodo;
