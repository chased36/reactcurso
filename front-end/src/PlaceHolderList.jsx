import { useEffect, useState } from "react";
import { getAllPosts } from "./services/postService";

export function PlaceHolderList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((data) => {
      setPosts(data.slice(0, 10));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h3>Lista de Posts (GET)</h3>
      {isLoading ? (
        <h4>Cargando...</h4>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <strong>#{post.id}</strong> - {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}