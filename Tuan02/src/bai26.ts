export {};
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTask26() {
  console.log("Câu 26 - Bắt đầu đợi 5 giây...");
  await wait(5000);
  console.log("Câu 26 - Đã đợi xong 5 giây!");
}

runTask26();