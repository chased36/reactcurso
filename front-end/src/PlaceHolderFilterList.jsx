import { useState } from "react";
import { filterPostsByUser } from "./services/postService";

export function PlaceHolderFilterList() {
  const [userId, setUserId] = useState("1");
  const [posts, setPosts] = useState([]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const filtrados = await filterPostsByUser(userId);
    setPosts(filtrados);
  };

  return (
    <div>
      <h3>Filtrar Posts por Usuario (FILTER)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="10"
          name="userId"
          placeholder="User ID (1 - 10)"
          value={userId}
          onChange={(evt) => setUserId(evt.target.value)}
        />
        <button type="submit">Filtrar</button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            [Usuario {post.userId}] <strong>#{post.id}</strong> - {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}