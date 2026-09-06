export {};
function downloadFile(): Promise<void> {
  return new Promise((resolve) => {
    console.log("Câu 25 - Bắt đầu tải file...");
    setTimeout(() => {
      console.log("Câu 25 - Tải file xong!");
      resolve();
    }, 3000);
  });
}

downloadFile();