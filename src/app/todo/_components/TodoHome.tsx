import { PageIcon } from "@/components/icons/ImageIcons";

const TodoHome = () => {
  return (
    <div className="mb-12">
      <div className="flex flex-row items-start justify-center">
        <PageIcon />
        <h1 className="ml-2 text-3xl font-bold">나의 투두 리스트</h1>
      </div>
      <p className="text-gray-500 ml-10">할 일을 정리해보세요!</p>
    </div>
  );
};

export default TodoHome;
