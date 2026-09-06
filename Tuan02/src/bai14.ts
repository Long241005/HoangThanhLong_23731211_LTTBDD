export {};

async function multiplyByThree(num: number): Promise<number> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return num * 3;
}

multiplyByThree(5).then((result) => console.log("Câu 14:", result));