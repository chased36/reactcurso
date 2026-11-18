import {useParams} from 'react-router-dom";
import {useAsync} 

export function DetallePlaceHolder() {
  const { id } = useParams();

  const { data, isLoading, error, recargar } = useQuery(
  (signal) => PlaceHolderService.get(id, signal),
    [],
);

}