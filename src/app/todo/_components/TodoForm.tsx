"use client";

import { useAddTodo } from "@/hooks/useAddTodo";
import { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const { mutate: addTodo } = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo({
      title,
      contents,
      isCompleted: false,
      createdAt: Date.now(),
    });

    setTitle("");
    setContents("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-2 align-center"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
        placeholder="제목을 입력하세요..."
        required
      />
      <input
        type="text"
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        className="w-full rounded border p-2"
        placeholder="내용을 입력하세요..."
        required
      />
      <button
        type="submit"
        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
