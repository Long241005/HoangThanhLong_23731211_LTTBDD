function task2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}
task2().then((num) => console.log("Câu 2:", num));