export {};

function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Task done"), time);
  });
}

async function runTask12() {
  const result = await simulateTask(2000);
  console.log("Câu 12:", result);
}

runTask12();