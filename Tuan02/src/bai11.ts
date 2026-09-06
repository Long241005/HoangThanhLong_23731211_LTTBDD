async function task11(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Hello Async"), 2000);
  });
}
async function runTask11() {
  const result = await task11(); 
  console.log("Câu 11:", result);
}
runTask11();