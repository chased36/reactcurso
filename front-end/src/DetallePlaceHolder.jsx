import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "./services/postService";

export function DetallePlaceHolder() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(id).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  if (isLoading) return <p>Cargando detalle...</p>;

  return (
    <div>
      <h3>Detalle del Post #{post.id}</h3>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </div>
  );
}