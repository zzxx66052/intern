"use client";

import { useRouter } from "next/navigation";

const TodoMoveButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/todo")}
      className="mt-6 rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
    >
      투두리스트 작성하기
    </button>
  );
};

export default TodoMoveButton;
