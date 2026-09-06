export {};

function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

async function runInParallel() {
  console.time("Câu 16 - song song");
  const [result1, result2, result3] = await Promise.all([
    simulateTask(500),
    simulateTask(500),
    simulateTask(500),
  ]);
  console.timeEnd("Câu 16 - song song");
  console.log("Câu 16:", result1, result2, result3);
}

runInParallel();