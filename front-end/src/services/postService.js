const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}