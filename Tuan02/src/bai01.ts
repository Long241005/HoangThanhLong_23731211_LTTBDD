function task1(): Promise<string> {
  // new Promise nhận 1 hàm executor với 2 tham số: resolve (thành công), reject (thất bại)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async"); // sau 2000ms, promise được "resolve" với giá trị này
    }, 2000);
  });
}
task1().then((result) => console.log("Câu 1:", result));