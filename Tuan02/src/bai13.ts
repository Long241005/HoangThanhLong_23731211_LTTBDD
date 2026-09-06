export {};

function task3(): Promise<never> {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Something went wrong"));
    }, 1000);
  });
}

async function runTask13() {
  try {
    const result = await task3();
    console.log("Câu 13:", result);
  } catch (error) {
    console.log("Câu 13 - bắt lỗi bằng try/catch:", (error as Error).message);
  }
}

runTask13();