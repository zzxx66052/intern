import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/todo";
import type { Todo } from "@/types/todoType";

export const useFetchTodo = () => {
  return useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
};
