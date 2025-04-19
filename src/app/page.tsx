import { PageIcon } from "@/components/icons/ImageIcons";
import TodoStartButton from "@/components/TodoStartButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-row">
        <PageIcon />
        <h1 className="text-3xl font-bold text-gray-800 ml-2">투두 리스트</h1>
      </div>
      <TodoStartButton />
    </main>
  );
}
