import { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "./services/postService";

export function PlaceHolderDelete() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((data) => setPosts(data.slice(0, 5)));
  }, []);

  const handleDelete = async (id) => {
    const eliminado = await deletePost(id);
    if (eliminado) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div>
      <h3>Eliminar Post (DELETE)</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>#{post.id}</strong> - {post.title}{" "}
            <button type="button" onClick={() => handleDelete(post.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}