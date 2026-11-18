const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

export async function getPostById(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
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

export async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}

export async function filterPostsByUser(userId) {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  return response.json();
}