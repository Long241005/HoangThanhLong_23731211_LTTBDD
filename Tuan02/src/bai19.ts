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

async function fetchUsers(ids: number[]): Promise<UserData[]> {
  const promises = ids.map((id) => fetchUser(id));
  return Promise.all(promises);
}

async function runTask19() {
  const users = await fetchUsers([1, 2, 3]);
  console.log("Câu 19:", users);
}

runTask19();