export {};
async function fetchWithRetry(url: string, retries: number): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Câu 27 - Lần thử ${attempt} thất bại:`, (error as Error).message);
      if (attempt === retries) {
        throw new Error("Đã hết số lần thử lại, vẫn thất bại");
      }
    }
  }
}

async function runTask27() {
  try {
    const data = await fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", 3);
    console.log("Câu 27:", data);
  } catch (error) {
    console.log("Câu 27 - lỗi cuối cùng:", (error as Error).message);
  }
}

runTask27();