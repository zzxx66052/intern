"use client";

import { DeleteIcon, UpdateIcon } from "@/components/icons/SvgIcons";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import { useToggleTodo } from "@/hooks/useToggleTodo";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { Todo } from "@/types/todoType";
import { useState } from "react";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newContents, setNewContents] = useState(todo.contents);

  const toggleMutation = useToggleTodo(todo.id);
  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();

  const handleSave = () => {
    if (!newTitle.trim()) return;

    updateMutation.mutate({
      id: todo.id,
      data: {
        title: newTitle,
        contents: newContents,
      },
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(todo.title);
    setNewContents(todo.contents);
  };

  const handleEditClick = () => {
    if (todo.isCompleted) return;
    setIsEditing(true);
  };

  return (
    <li className="flex flex-col gap-2 rounded border p-4 shadow-sm sm:flex-row sm:justify-between sm:items-start">
      <div className="flex w-full flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() =>
            toggleMutation.mutate({ isCompleted: !todo.isCompleted })
          }
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-green-500 transition-transform duration-200 hover:scale-125"
        />

        {/* 수정 모드 */}
        {isEditing ? (
          <div className="flex w-full flex-col gap-2">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full rounded border p-2"
            />
            <textarea
              value={newContents}
              onChange={(e) => setNewContents(e.target.value)}
              className="w-full rounded border p-2"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="text-sm text-gray-500 underline"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full min-w-0">
            <h3
              className={`truncate text-lg font-semibold ${
                todo.isCompleted ? "line-through text-gray-400" : ""
              }`}
            >
              제목: {todo.title}
            </h3>
            <p className="text-sm text-gray-600 break-words">
              내용: {todo.contents}
            </p>
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="mt-2 flex justify-end gap-2 sm:mt-0">
          <button
            onClick={handleEditClick}
            disabled={todo.isCompleted}
            className={`text-blue-500 transition-transform duration-200 hover:scale-125 ${
              todo.isCompleted ? "cursor-not-allowed opacity-30" : ""
            }`}
          >
            <UpdateIcon />
          </button>
          <button
            onClick={() => deleteMutation.mutate(todo.id)}
            className="text-red-500 transition-transform duration-200 hover:scale-125"
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </li>
  );
};
