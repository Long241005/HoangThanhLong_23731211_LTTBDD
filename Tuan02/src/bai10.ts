function riskyTask(shouldFail: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Thất bại"));
      else resolve("Thành công");
    }, 500);
  });
}
riskyTask(true)
  .then((result) => console.log("Câu 10:", result))
  .catch((err) => console.log("Câu 10 - lỗi:", err.message))
  .finally(() => console.log("Câu 10 - Done")); 