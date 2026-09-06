function makeDelayedPromise(value: string, delay: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

Promise.all([
  makeDelayedPromise("Task A", 1000),
  makeDelayedPromise("Task B", 500),
  makeDelayedPromise("Task C", 1500),
]).then((results) => console.log("Câu 6 - Promise.all:", results));