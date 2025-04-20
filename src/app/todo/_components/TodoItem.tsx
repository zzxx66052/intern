"use client";

import { DeleteIcon, UpdateIcon } from "@/components/icons/SvgIcons";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import { useToggleTodo } from "@/hooks/useToggleTodo";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { Todo } from "@/types/todoType";
import { useState } from "react";
import Swal from "sweetalert2";
import TodoCheckbox from "./TodoCheckbox";
import TodoDisplay from "./TodoDisplay";
import TodoEditForm from "./TodoEditForm";

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

  const deleteClickAlert = (onConfirm: () => void) => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "삭제하면 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });
  };

  return (
    <li className="flex flex-col gap-2 rounded border p-4 shadow-sm sm:flex-row sm:justify-between sm:items-start">
      <div
        className={`flex flex-col items-start ${
          isEditing ? `flex-1 w-full` : ""
        }`}
      >
        {isEditing ? (
          <TodoEditForm
            newTitle={newTitle}
            newContents={newContents}
            onChangeTitle={setNewTitle}
            onChangeContents={setNewContents}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="flex flex-col">
            <TodoCheckbox
              todo={todo}
              onToggle={() =>
                toggleMutation.mutate({ isCompleted: !todo.isCompleted })
              }
            />

            <TodoDisplay
              title={todo.title}
              contents={todo.contents}
              isCompleted={todo.isCompleted}
            />
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex flex-col items-end gap-2 sm:mt-0 min-w-[100px]">
          <div className="flex gap-2">
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
              onClick={() =>
                deleteClickAlert(() => deleteMutation.mutate(todo.id))
              }
              className="text-red-500 transition-transform duration-200 hover:scale-125"
            >
              <DeleteIcon />
            </button>
          </div>
          <span className="text-xs text-gray-400">
            {formatDate(todo.createdAt)}
          </span>
        </div>
      )}
    </li>
  );
};
