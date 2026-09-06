export {};

function makeDelayedPromise(value: string, delay: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

async function runForAwait() {
  const promises = [
    makeDelayedPromise("Item 1", 300),
    makeDelayedPromise("Item 2", 100),
    makeDelayedPromise("Item 3", 200),
  ];

  for await (const value of promises) {
    console.log("Câu 17 - nhận được:", value);
  }
}

runForAwait();