"use client";

import { useState } from "react";

import TodoItem from "./TodoItem";
import Spinner from "./Spinner";
import { useFetchTodo } from "@/hooks/useFetchTodo";

const FILTERS = ["전체", "완료", "미완료"] as const;
type FilterType = (typeof FILTERS)[number];

const TodoList = () => {
  const [filter, setFilter] = useState<FilterType>("전체");
  const { data: todos = [], isPending, isError } = useFetchTodo();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "완료") return todo.isCompleted;
    if (filter === "미완료") return !todo.isCompleted;
    return true;
  });

  if (isPending) return <Spinner />;
  if (isError) return <p className="text-center">오류 발생</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded border ${
              filter === f ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTodos.length === 0 ? (
          <li className="text-center text-gray-400">할 일이 없습니다.</li>
        ) : (
          filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </ul>
    </div>
  );
};

export default TodoList;
