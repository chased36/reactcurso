import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { obtenerProductos } from "./services/productosService";
import { MiniCatalogo } from "./MiniCatalogo";
import { DetalleProducto } from "./pages/DetalleProducto";
import { Pagina404 } from "./pages/Pagina404";

export function CatalogoJoyeria() {

    // Estado compartido de los productos
    const [productos, setProductos] = useState([]);
    // Estados para la petición a la API
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Obtener productos desde DummyJSON
    useEffect(() => {

        async function cargarProductos() {
            try {
                setCargando(true);
                setError("");

                const datos = await obtenerProductos();

                setProductos(datos);

            } catch (error) {
                setError(error.message);

            } finally {
                setCargando(false);
            }
        }

        cargarProductos();

    }, []);

    // Agregar un nuevo producto
    function agregarProducto(datosProducto) {

        setProductos((anteriores) => {

            const nuevoId = anteriores.length > 0
                ? Math.max(...anteriores.map((producto) => producto.id)) + 1
                : 1;

            const nuevoProducto = {
                id: nuevoId,
                ...datosProducto
            };

            return [...anteriores, nuevoProducto];
        });
    }

    // Mostrar mensaje mientras se obtienen los productos
    if (cargando) {
        return <p>Cargando productos desde DummyJSON...</p>;
    }
    // Mostrar mensaje si ocurre un error
    if (error) {
        return <p>❌ Error al cargar productos: {error}</p>;
    }

    return (
        <Routes>
            <Route
                index
                element={
                    <MiniCatalogo
                        productos={productos}
                        onAgregar={agregarProducto}
                    />
                }
            />

            <Route
                path=":id"
                element={<DetalleProducto productos={productos} />}
            />

            <Route
                path="*"
                element={<Pagina404 />}
            />
        </Routes>
    );
}