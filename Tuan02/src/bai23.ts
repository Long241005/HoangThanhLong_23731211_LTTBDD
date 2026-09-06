export {};

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchIncompleteTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const todos: Todo[] = await response.json();
  return todos.filter((todo) => !todo.completed);
}

async function runTask23() {
  const incomplete = await fetchIncompleteTodos();
  console.log("Câu 23 - số todo chưa xong:", incomplete.length);
}

runTask23();