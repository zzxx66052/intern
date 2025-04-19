import { updateTodo } from "@/api/todo";
import { Todo } from "@/types/todoType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (updated: Partial<Todo>) => updateTodo(todo.id, updated),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((t) =>
          t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
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

  return (
    <li className="flex items-start gap-3 rounded border p-4 shadow-sm">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() =>
          toggleMutation.mutate({ isCompleted: !todo.isCompleted })
        }
        className="h-5 w-5 accent-green-500"
      />
      <div className="flex flex-col items-start">
        <h3
          className={`text-lg font-medium ${
            todo.isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          제목 : {todo.title}
        </h3>
        <p className="text-sm text-gray-600"> 내용 : {todo.contents}</p>
      </div>
    </li>
  );
};

export default TodoItem;
