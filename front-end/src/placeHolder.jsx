
import { useAsync } from "./hooks/useAsync";
import { placeHolderServices } from "./services/placeHolderService";
import { ErrorPanel } from "./components/ErrorPanel";

export function PlaceHolder() {
  const { data, loading, error, recargar } = useAsync(
    async (signal) =>{
      await new Promise(resolve => setTimeout(resolve, 2000));
      return placeHolderServices.get(4,signal);
    },
    []
  );

  if (loading) 
    return <p>⏳ Buscando...</p>;

  if (error) {
    return (
      <ErrorPanel
        error={error}
        onRetry={recargar}
      />
    );
  }

  if (!data) {
    return <p>Sin resultados.</p>;
  }
  return(
    <div>
        <p>
            <h3 color="green">Respuesta del servidor</h3>
            {data.id}
            <br></br>
            {data.title}
        </p>
    </div>
  )
  
}