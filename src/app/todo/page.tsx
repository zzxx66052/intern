import TodoForm from "./_components/TodoForm";
import TodoHome from "./_components/TodoHome";
import TodoList from "./_components/TodoList";

const page = () => {
  return (
    <div className="mx-auto max-w-2xl p-6 text-center">
      <TodoHome />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default page;
