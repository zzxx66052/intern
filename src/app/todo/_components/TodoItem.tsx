import { useToggleTodo } from "@/hooks/useToggleTodo";
import { Todo } from "@/types/todoType";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const toggleMutation = useToggleTodo(todo.id);

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
