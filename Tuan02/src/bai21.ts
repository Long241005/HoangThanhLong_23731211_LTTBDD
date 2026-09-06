export {};

async function runTask21() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    console.log("Câu 21:", data);
  } catch (error) {
    console.log("Câu 21 - lỗi:", (error as Error).message);
  }
}

runTask21();