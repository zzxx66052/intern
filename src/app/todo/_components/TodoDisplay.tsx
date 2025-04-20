"use client";

interface Props {
  title: string;
  contents: string;
  isCompleted: boolean;
}

const TodoDisplay = ({ title, contents, isCompleted }: Props) => {
  return (
    <div className="flex flex-col items-start">
      <h3
        className={`text-lg font-semibold mt-2 ${
          isCompleted ? "line-through text-gray-400" : ""
        }`}
      >
        제목: {title}
      </h3>
      <p className="text-sm text-gray-600 break-words">내용: {contents}</p>
    </div>
  );
};

export default TodoDisplay;
