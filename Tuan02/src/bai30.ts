export {};
async function runTask30() {
  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/todos/1").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }),
    fetch("https://jsonplaceholder.typicode.com/invalid-url-xyz").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }),
    fetch("https://jsonplaceholder.typicode.com/todos/2").then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Câu 30 - API ${index + 1} thành công:`, result.value);
    } else {
      console.log(`Câu 30 - API ${index + 1} thất bại:`, (result.reason as Error).message);
    }
  });
}

runTask30();