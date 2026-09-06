export {};

function simulateTask(delay: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${delay}ms done`);
    }, delay);
  });
}
async function batchProcess() {
  const tasks = [
    simulateTask(300),
    simulateTask(500),
    simulateTask(200),
    simulateTask(400),
    simulateTask(100),
  ];

  const results = await Promise.all(tasks);
  console.log("Câu 28 - batch xong:", results);
}

batchProcess();