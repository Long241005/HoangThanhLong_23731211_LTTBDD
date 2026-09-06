export {};

interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

interface PostResponse extends PostPayload {
  id: number;
}

async function postData(): Promise<PostResponse> {
  const payload: PostPayload = { title: "foo", body: "bar", userId: 1 };

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
}

async function runTask24() {
  try {
    const result = await postData();
    console.log("Câu 24:", result);
  } catch (error) {
    console.log("Câu 24 - lỗi:", (error as Error).message);
  }
}

runTask24();