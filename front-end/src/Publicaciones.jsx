import { PostList } from "./PostList";
import { PostDetail } from "./PostDetail";
import { PostCreate } from "./PostCreate";
import { PostUpdate } from "./PostUpdate";
import { PostDelete } from "./PostDelete";
import { PostFilter } from "./PostFilter";

export function Publicaciones() {
  return (
    <div className="practice-stack">
      <h1>Práctica JSONPlaceholder</h1>
      <p>Las altas, cambios y eliminaciones de esta API son simulados.</p>
      <PostList /><PostDetail /><PostCreate /><PostUpdate /><PostDelete /><PostFilter />
    </div>
  );
}
