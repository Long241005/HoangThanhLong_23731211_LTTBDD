export {};

function simulateTask(delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${delay}ms done`);
    }, delay);
  });
}
async function queueProcess() {
  const taskTimes = [300, 500, 200, 400, 100];
  const results: string[] = [];

  for (const time of taskTimes) {
    const result = await simulateTask(time);
    results.push(result);
    console.log(`Câu 29 - đã xử lý tác vụ ${time}ms`);
  }

  console.log("Câu 29 - hàng đợi xong:", results);
}

queueProcess();