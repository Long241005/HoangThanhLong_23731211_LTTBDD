function task3(): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong")); 
    }, 1000);
  });
}
task3().catch((err) => console.log("Câu 3 - lỗi bắt được:", err.message));