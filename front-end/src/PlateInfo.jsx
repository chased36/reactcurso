import { useParams } from "react-router-dom";
import { PlateItem } from "./PlateItem";

export function PlateInfo({ plates }) {
    const { id } = useParams();
    const data = plates?.find((plate) => String(plate.id) === String(id));

    if (!data) return <p>Sin resultados.</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Menú</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <PlateItem id={data.id} plato={data} />
            </tbody>
        </table>
    );
}