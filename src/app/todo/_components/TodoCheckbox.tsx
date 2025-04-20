"use client";

import type { Todo } from "@/types/todoType";

interface Props {
  todo: Todo;
  onToggle: () => void;
}

const TodoCheckbox = ({ todo, onToggle }: Props) => {
  return (
    <>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={onToggle}
        className="h-5 w-5 cursor-pointer accent-green-500 transition-transform duration-200 hover:scale-125"
      />
    </>
  );
};

export default TodoCheckbox;
