"use client";

interface Props {
  newTitle: string;
  newContents: string;
  onChangeTitle: (val: string) => void;
  onChangeContents: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const TodoEditForm = ({
  newTitle,
  newContents,
  onChangeTitle,
  onChangeContents,
  onSave,
  onCancel,
}: Props) => {
  return (
    <>
      <input
        value={newTitle}
        onChange={(e) => onChangeTitle(e.target.value)}
        className="w-full rounded border p-2"
      />
      <textarea
        value={newContents}
        onChange={(e) => onChangeContents(e.target.value)}
        className="w-full rounded border p-2 mt-2"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={onSave}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
        >
          저장
        </button>
        <button
          onClick={onCancel}
          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
        >
          취소
        </button>
      </div>
    </>
  );
};

export default TodoEditForm;
