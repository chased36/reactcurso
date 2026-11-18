const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

export async function createPost(nuevoPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(nuevoPost),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
}

export async function updatePost(id, postActualizado) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      ...postActualizado,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
}