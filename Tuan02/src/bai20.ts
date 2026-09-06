export {};

interface UserData {
  id: number;
  name: string;
}

function fetchUser(id: number): Promise<UserData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}` });
    }, 1000);
  });
}

function fetchUserWithTimeout(id: number, timeoutMs: number): Promise<UserData> {
  const apiCall = fetchUser(id);
  const timeout = new Promise<never>((_resolve, reject) => {
    setTimeout(() => reject(new Error("Timeout: API mất quá lâu")), timeoutMs);
  });
  return Promise.race([apiCall, timeout]);
}

async function runTask20() {
  try {
    const user = await fetchUserWithTimeout(1, 2000);
    console.log("Câu 20:", user);
  } catch (error) {
    console.log("Câu 20 - lỗi:", (error as Error).message);
  }
}

runTask20();