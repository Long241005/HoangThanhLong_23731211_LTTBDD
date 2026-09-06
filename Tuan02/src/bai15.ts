export {};

function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

async function runSequentially() {
  console.time("Câu 15 - tuần tự");
  const result1 = await simulateTask(500);
  const result2 = await simulateTask(500);
  const result3 = await simulateTask(500);
  console.timeEnd("Câu 15 - tuần tự");
  console.log("Câu 15:", result1, result2, result3);
}

runSequentially();