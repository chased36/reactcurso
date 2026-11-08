import { useEffect, useState } from "react";
<<<<<<< HEAD
import { GetAllProducts } from "./ProductList";
import { ProductForm } from "./ProductForm";

export function Catalogo({ products }) {
    const [productos, setProductos] = useState(products || []);
    const [isLoading, setLoading] = useState(true);
    const [canHandleForm, setCanHandleForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Función para eliminar un producto con ventana de confirmación
    const handleDeleteProduct = (id) => {
        // Ventana nativa del navegador
        const confirmado = window.confirm("¿Estás seguro de que quieres eliminar este producto?");

        // Si el usuario le da a "Aceptar", 'confirmado' será true y se borra
        if (confirmado) {
            setProductos((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const handleEditProduct = (producto) => {
        setSelectedProduct(producto);
        setCanHandleForm(true);
    };

    // Función para guardar (crear o actualizar en la lista)
    const handleSaveProduct = (productData) => {
        if (selectedProduct) {
            // Actualizar existente
            setProductos(productos.map(p => p.id === productData.id ? productData : p));
        } else {
            // Crear nuevo
            setProductos([...productos, productData]);
        }
        setCanHandleForm(false); // Cierra el formulario al guardar
        setSelectedProduct(null);
    };

    return (
        <div>
            {isLoading ? (
                <h4>Cargando...</h4>
            ) : (
                <GetAllProducts
                    products={productos}
                    onEditClick={handleEditProduct}
                    onDeleteClick={handleDeleteProduct}
                />
            )}

            <div className="mag-btns" style={{ marginTop: "15px" }}>
                <button
                    onClick={() => {
                        setSelectedProduct(null);
                        setCanHandleForm(true);
                    }}
                    className="mag-btn mag-btn-primary"
                >
                    Agregar Producto
                </button>
            </div>


            {canHandleForm && (
                <div style={{ marginTop: "20px" }}>
                    <ProductForm
                        selectedProduct={selectedProduct}
                        onSaveProduct={handleSaveProduct}
                    />
                </div>
            )}
        </div>
    );
}
=======
import "./form.css";
import { ProductForm } from "./ProductForm";
import { GetAllProducts } from "./ProductList";
export function Catalogo({ products }) {
  //definir estado para productos, cargando
  const [productos, setProductos] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //controlar si el formulario esta siendo abierto y si estamos editando o creando
  const [showForm, setShowForm] = useState(false);
  const [productSeleccionado, setproductSeleccionado] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setProductos(products);
    }, 2500);
  }, []);

  //crud -create, read, update, delete
  const handlerSaveProduct = (nuevoOActualizado) => {
    // update: reemplazar el producto seleccionado con el id
    if (productSeleccionado) {
      //reemplacemos el product que coincida con el id
      setProductos(prev=> prev.map(p=> p.id == productSeleccionado.id? nuevoOActualizado: p))      
    }
    else{
      // agrega un nuevo elemento
      setProductos((prev) => [
        ...prev,
        { ...nuevoOActualizado, id: `p${Date.now()}` },
      ]);
    }

    //cerrar formulario y limpiarlo
    setShowForm(false);
    setproductSeleccionado(null);
  };

  const handlerRemoveProduct = (id) => {
    // Elimine, filtre o saque de productos el id seleccionado
    // podriamos eliminar con filter, o con slice
    setProductos(prev => prev.filter(p=> p.id != id))
  }

  const handlerIniciarEdicion = (producto) => {    
    setproductSeleccionado(producto);
    setShowForm(true);
  }

  return (
    <>
      <div>
        {isLoading ? (
          <h4>Cargando...</h4>
        ) : (          
          <GetAllProducts
            products={productos}
            onEdit = {handlerIniciarEdicion}
            onRemove = {handlerRemoveProduct}
          />
        )}

        <div class="mag-btns">
          <button
            onClick={() => {
              setproductSeleccionado(null)
              setShowForm(true)
            }}
            class="mag-btn mag-btn-primary"
          >
            Agregar Producto
          </button>
          {/* <button onClick={()=> setCanHandleForm(false)} class="mag-btn mag-btn-ghost">Eliminar Producto</button> */}
        </div>

        {showForm ? (
          <ProductForm
            key = {productSeleccionado ? productSeleccionado.id: ''}
            productAEditar={productSeleccionado}
            onSave={handlerSaveProduct}
            onCancel={()=>{
              setShowForm(false)
              setproductSeleccionado(null)
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
>>>>>>> main
