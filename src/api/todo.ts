import type { Todo } from "@/types/todoType";

const API_URL = "https://beaded-silk-mozzarella.glitch.me/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("데이터 불러오기 실패");
  return response.json();
};

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("투두 추가 실패");
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("투두 삭제 실패");
};

export const updateTodo = async (
  id: string,
  updatedData: Partial<Todo>
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("투두 업데이트 실패");
  return response.json();
};

export const toggleTodo = async (id: string, completed: boolean) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
};
