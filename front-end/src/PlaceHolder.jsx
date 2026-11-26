import { useAsync } from "./hooks/useAsync";
import { placeHolderServices } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolder(){
    const { data, loading, error, recargar } = useAsync(
        (signal) => placeHolderServices.get(signal),
        []
      );
    
      if (loading) return <p>⏳ Buscando...</p>;
      if (error)   return <ErrorPanel error={error} onRetry={recargar} />;
      if (!data) return <p>Sin resultados.</p>;

      return(
        <>
        <p>{data.id}</p>
        <p>{data.title}</p>
        </>
      )
<<<<<<< HEAD
}
=======
}
>>>>>>> 80e245bb3ee89254b2ac5eb0d49f3a91a3d33d87
