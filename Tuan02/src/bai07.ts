export {};

function makeDelayedPromise(value: string, delay: number): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

Promise.race([
  makeDelayedPromise("Nhanh nhất", 300),
  makeDelayedPromise("Chậm hơn", 1000),
]).then((winner) => console.log("Câu 7 - Promise.race:", winner));