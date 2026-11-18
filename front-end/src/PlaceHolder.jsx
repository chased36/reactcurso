import { PlaceHolderList } from "./PlaceHolderList";
import { PlaceHolderCreate } from "./PlaceHolderCreate";
import { PlaceHolderUpdate } from "./PlaceHolderUpdate";

export function PlaceHolder() {
  return (
    <div>
      <h2>Metodos JSONPlaceholder</h2>
      <hr />
      <PlaceHolderList />
      <hr />
      <PlaceHolderCreate />
      <hr />
      <PlaceHolderUpdate />
    </div>
  );
}