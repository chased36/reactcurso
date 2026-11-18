import { PlaceHolderList } from "./PlaceHolderList";
import { PlaceHolderCreate } from "./PlaceHolderCreate";
import { PlaceHolderUpdate } from "./PlaceHolderUpdate";
import { PlaceHolderDelete } from "./PlaceHolderDelete";
import { PlaceHolderFilterList } from "./PlaceHolderFilterList";

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
      <hr />
      <PlaceHolderDelete />
      <hr />
      <PlaceHolderFilterList />
    </div>
  );
}