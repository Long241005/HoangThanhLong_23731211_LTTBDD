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

async function runTask18() {
  const user = await fetchUser(1);
  console.log("Câu 18:", user);
}

runTask18();