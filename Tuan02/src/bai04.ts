function getRandomNumber(): Promise<number> {
  return new Promise((resolve, reject) => {
    const num = Math.random();
    setTimeout(() => {
      if (num > 0.5) {
        resolve(num);
      } else {
        reject(new Error("Số quá nhỏ")); 
      }
    }, 500);
  });
}
getRandomNumber()
  .then((num) => console.log("Câu 4 - thành công:", num))
  .catch((err) => console.log("Câu 4 - thất bại:", err.message));