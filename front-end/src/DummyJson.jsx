import { useState } from 'react'
import { useAsync } from "./hooks/useAsync";
import { dummyJsonProductsService } from "./services/dummyJsonProductsService";
import { ErrorPanel } from "./components/ErrorPanel";

export function DummyJson() {
    // Texto escrito en el buscador
    const [busqueda, setBusqueda] = useState("");
    //const [id, setId] = useState(1);
    const [resultado, setResultado] = useState(null);
    const [loadingC, setLoading] = useState(false);
    const [errorC, setError] = useState("");
    const [operacion, setOperacion] = useState("insertar");
    const [operacionRealizada, setOperacionRealizada] = useState("");
    const [idEliminar, setIdEliminar] = useState("");
    const [idActualizar, setIdActualizar] = useState("");
    const [productoCargado, setProductoCargado] = useState(false);

    const { data, loading, error, recargar } = useAsync(
        (signal) => dummyJsonProductsService.getListFiltered({
            limit: 10,
            skip: 0,
            signal
        }),
        []
    );

    ///////////// INICIA create /////////////////
    //Consultar una lista de elementos
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        category: '',
        stock: 0,
        thumbnail: ''
    });


    //Capturar los datos en los inputs del formulario
    const handleChange = (e) => {

        const { name, value } = e.target;

        // Ocultar mensaje anterior
        setResultado(null);
        setOperacionRealizada("");
        setError("");

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: (name === "id" || name === "price" || name === "stock")
                ? Number(value)
                : value
        }));
    };

    //captura el ID del input 
    const handleChangeD = (e) => {
        setIdEliminar(Number(e.target.value));
        // Ocultar mensaje anterior
        setResultado(null);
        setOperacionRealizada("");
        setError("");
    };

    const buscarProducto = async () => {

        const id = Number(idActualizar);

        if (!idActualizar || !Number.isInteger(id) || id < 1) {
            setError("Ingresa un ID válido.");
            return;
        }

        setLoading(true);
        setError("");
        setResultado(null);
        setOperacionRealizada("");

        try {

            const producto =
                await dummyJsonProductsService.getProductById(id);

            setFormData({
                title: producto.title ?? "",
                price: producto.price ?? 0,
                category: producto.category ?? "",
                stock: producto.stock ?? 0,
                thumbnail: producto.thumbnail ?? ""
            });

            setProductoCargado(true);

        } catch (err) {

            setError("No se encontró el producto: " + err.message);
            setProductoCargado(false);

        } finally {
            setLoading(false);
        }
    };

    // Enviar los datos
    const handleSubmit = async (e, tipoOperacion) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setResultado(null);
        setOperacionRealizada("");

        try {

            if (tipoOperacion === "insertar") {

                if (!formData.title.trim() ||
                    Number(formData.price) <= 0 ||
                    !formData.category.trim() ||
                    Number(formData.stock) < 0) {
                    setError("Todos los campos son obligatorios.");
                    return;
                }

                const res = await dummyJsonProductsService.createProduct(formData);
                console.log("Respuesta del servidor:", res);
                setResultado(res);
                setOperacionRealizada("insertar");

                setFormData({
                    title: '',
                    price: 0,
                    category: '',
                    stock: 0,
                    thumbnail: ''
                });
            } else if (tipoOperacion === "eliminar") {
                // Validar ID
                const id = Number(idEliminar);

                if (!idEliminar || !Number.isInteger(id) || id < 1) {
                    setError("Ingresar un ID válido para eliminar.");
                    return;
                }

                // Confirmación
                const confirmDelete = window.confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`);
                if (!confirmDelete) {
                    return;
                }

                // Ejecutar DELETE
                const res = await dummyJsonProductsService.delete(id);
                console.log("Respuesta del Servidor:", res);
                setResultado(res);
                setOperacionRealizada("eliminar");
                setIdEliminar("");
            } else if (tipoOperacion === "actualizar") {

                e.preventDefault();

                const id = Number(idActualizar);

                if (
                    !formData.title.trim() ||
                    Number(formData.price) <= 0 ||
                    !formData.category.trim() ||
                    Number(formData.stock) < 0
                ) {
                    setError("Verifica los datos del producto.");
                    return;
                }

                setLoading(true);
                setError("");
                setResultado(null);
                setOperacionRealizada("");
                const res =
                    await dummyJsonProductsService.updateProduct(id, formData);

                console.log("Producto actualizado:", res);

                setResultado(res);
                setOperacionRealizada("actualizar");

                setProductoCargado(false);
                setIdActualizar("");

            }

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    };



    if (loading) return <p>⏳ Buscando productos...</p>;

    if (error) {
        return (
            <ErrorPanel
                error={error}
                onRetry={recargar}
            />
        );
    }

    if (!data || data.length === 0) {
        return <p>Sin resultados.</p>;
    }
    // Normalizar el texto de búsqueda
    const texto = busqueda.trim().toLowerCase();
    // Aplicar el filtro
    const productosFiltrados = data.filter((producto) => {
        return (
            String(producto.id).includes(texto) ||
            String(producto.title ?? "").toLowerCase().includes(texto) ||
            String(producto.price ?? "").includes(texto) ||
            String(producto.category ?? "").toLowerCase().includes(texto) ||
            String(producto.stock ?? "").includes(texto)
        );
    });

    return (

        <div>
            {/*////////// CREATE ////////////////*/}
            <div>

                <h2>Crear una nuevo producto</h2>

                <form onSubmit={(e) => handleSubmit(e, "insertar")}>

                    <div>
                        <label htmlfor="name">Producto:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Nombre del producto"
                            required
                        />
                    </div>

                    <div>
                        <label>Categoría:</label>
                        <textarea
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Escribe la categoría"
                            required
                        />
                    </div>
                    <div>
                        <label>Precio:</label>
                        <textarea
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Escribe el precio"
                            required
                        />
                    </div>
                    <div>
                        <label>Stock:</label>
                        <textarea
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Escribe el stock"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loadingC}
                    >
                        {loadingC ? "Enviando..." : "Crear nuevo producto"}

                    </button>

                </form>

                {errorC && (
                    <p style={{ color: "red" }}>{errorC}</p>
                )}

            </div>
            {/*//////////// FIN create //////////////*/}

            {/*/////////// Elimina producto  //////////////*/}
            <div>
                <h2> Eliminar producto  </h2>

                <form onSubmit={(e) => handleSubmit(e, "eliminar")}>

                    <input
                        type="number"
                        id="idDelete"
                        value={idEliminar}
                        onChange={handleChangeD}
                        min="1"
                        placeholder="Escribe el ID del producto"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loadingC}
                    >
                        {loadingC ? "Eliminando..." : "Eliminar"}
                    </button>
                </form>
                {/* ACTUALIZAR PRODUCTO */}

                <div>
                    <h2>Actualizar producto</h2>

                    <label>ID del producto:</label>
                    <input
                        type="number"
                        min="1"
                        value={idActualizar}
                        onChange={(e) => {
                            setIdActualizar(e.target.value);
                            setProductoCargado(false);
                            setResultado(null);
                            setOperacionRealizada("");
                            setError("");
                        }}
                        placeholder="Escribe el ID"
                    />

                    <button
                        type="button"
                        onClick={buscarProducto}
                        disabled={loadingC}
                    >
                        Buscar producto
                    </button>

                    {productoCargado && (


                        <form onSubmit={(e) => handleSubmit(e, "actualizar")}>

                            <h3>Modificar datos</h3>
                            <div>
                                <label>Producto:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Categoría:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Stock:</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit" disabled={loadingC}>
                                    Guardar cambios
                                </button>
                            </div>

                        </form>
                    )}
                </div>

                {resultado && operacionRealizada === "insertar" && (
                    <div style={{
                        border: "1px solid green",
                        padding: "15px",
                        marginTop: "15px"
                    }}>
                        <h3 style={{ color: "green" }}>
                            Producto creado correctamente
                        </h3>
                        <p>ID: {resultado.id}</p>
                        <p>Producto: {resultado.title}</p>
                        <p>Categoría: {resultado.category}</p>
                        <p>Precio: {resultado.price}</p>
                        <p>Stock: {resultado.stock}</p>
                    </div>
                )}

                {resultado && operacionRealizada === "eliminar" && (
                    <div style={{
                        border: "1px solid red",
                        padding: "15px",
                        marginTop: "15px"
                    }}>
                        <h3 style={{ color: "magenta" }}>
                            Producto eliminado correctamente
                        </h3>
                        <p>ID: {resultado.id}</p>
                        <p>Producto: {resultado.title}</p>
                        <p>
                            Estado: {resultado.isDeleted ? "Eliminado" : "No eliminado"}
                        </p>
                    </div>
                )}
                {resultado && operacionRealizada === "actualizar" && (
                    <div style={{
                        border: "1px solid blue",
                        padding: "15px",
                        marginTop: "15px"
                    }}>
                        <h3 style={{ color: "blue" }}>
                            Producto actualizado correctamente
                        </h3>

                        <p>ID: {resultado.id}</p>
                        <p>Producto: {resultado.title}</p>
                        <p>Categoría: {resultado.category}</p>
                        <p>Precio: {resultado.price}</p>
                        <p>Stock: {resultado.stock}</p>
                    </div>
                )}
                {error && (
                    <p style={{ color: "red" }}>
                        {errorC}
                    </p>

                )}
            </div>

            <h2>Productos de DummyJSON</h2>
            {/* Buscador */}
            <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <p>
                Productos encontrados:
                {productosFiltrados.length}
            </p>
            {/*Muestra resultados filtrados*/}
            {productosFiltrados.length === 0 ? (
                <p>No se encontraron productos
                    que coincidan con el filtro.
                </p>
            ) :
                (
                    <div>
                        <h2>Lista de productos filtrados (Se muetran solo 10)</h2>
                        <table border="1" cellPadding="10">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosFiltrados.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>
                                            <img
                                                src={producto.thumbnail}
                                                alt={producto.title}
                                                width="80"
                                            />
                                        </td>
                                        <td>{producto.title}</td>
                                        <td>{producto.category}</td>
                                        <td>${producto.price.toFixed(2)}</td>
                                        <td>{producto.stock}</td>
                                        <td>{producto.stock > 0 ? "Disponible" : "No disponible"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    );
}

