function square(n: number): Promise<number> {
  return new Promise((resolve) => resolve(n * n));
}

square(2)
  .then((result) => result * 2) 
  .then((result) => result + 5) 
  .then((finalResult) => console.log("Câu 8 - kết quả cuối:", finalResult));