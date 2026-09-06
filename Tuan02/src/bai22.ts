export {};

async function fetchTodo(id: number) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
}

async function runTask22() {
  for (const id of [1, 2, 3]) {
    const todo = await fetchTodo(id);
    console.log(`Câu 22 - Todo ${id}:`, todo);
  }
}

runTask22();