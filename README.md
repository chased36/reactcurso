# Ejercicios de React — Yendalifaz

## Versión de entrega

**La versión integrada para revisar y entregar está en la rama `yendali_react_jsonplaceholder`.**

[Ver la rama de entrega en GitHub](https://github.com/manu-maldonado/reactcurso/tree/yendali_react_jsonplaceholder)

Esta rama reúne los ejercicios **1, 3 y 4**, la práctica adicional con JSONPlaceholder y la base de sesión del profesor incorporada desde `main` (commit `80e245b`, del 18 de noviembre de 2026).

La rama `yendali_diplomadoweb_react` conserva los avances anteriores como referencia. Para revisar el trabajo integrado se debe usar `yendali_react_jsonplaceholder`.

## Ejecutar el proyecto

Desde la raíz del repositorio:

```bash
cd front-end
npm ci
npm run dev
```

Abre la dirección que indique Vite, normalmente `http://localhost:5173`.

La aplicación está en `front-end`; las dependencias y comandos de la aplicación se ejecutan desde esa carpeta.

## Inicio de sesión de la práctica

Se conserva la demostración del profesor con `AuthProvider`, `useAuth`, `ProtectedRoute` y el encabezado HTTP `Authorization`.

1. Abre la aplicación. Sin sesión se muestra `/login`.
2. Escribe un correo válido y una contraseña de prueba, por ejemplo `alumna@example.com` y `prueba123`.
3. El servicio consulta `/bearer` en HTTPBin con el token de demostración configurado.
4. Al iniciar sesión se abre la dirección privada solicitada; si no había una, se abre Inicio.
5. **Salir** limpia la sesión y vuelve al login.

La contraseña es un campo del formulario de demostración: HTTPBin comprueba el encabezado Bearer y no valida un registro de usuarios ni esa contraseña. La sesión se conserva en `sessionStorage` y se verifica con el servicio al recargar. No se deben usar credenciales personales en esta práctica.

El menú y los componentes privados se montan después de verificar la sesión. Escribir una URL privada directamente también exige iniciar sesión.

## Ejercicios integrados

| Ejercicio | Implementación | Dónde revisarlo |
| --- | --- | --- |
| **1. Mini catálogo estático** | Productos iniciales locales, filtro por nombre, alta, edición y eliminación con confirmación. Formulario de tres pasos con validación de nombre, categoría, precio y stock. Ordenamiento por columnas sin modificar el arreglo original. | `/catalogo` |
| **3. Catálogo con rutas** | Enlaces desde la lista hacia el detalle, identificación mediante `useParams`, regreso al catálogo y página 404 para direcciones o productos inexistentes. | `/catalogo/:id` y `/catalogo-api/:id` |
| **4. Integración con API externa** | Catálogo conectado a DummyJSON. El servicio adapta `title`, `price` y `category` a `nombre`, `precio` y `categoria`; la lista, el formulario y el detalle son los mismos que en el catálogo local. Incluye carga, errores y reintento. | `/catalogo-api` |

El catálogo local recupera el formulario, las validaciones y el CRUD desarrollados en `yendali_diplomadoweb_react`. La práctica con JSONPlaceholder de esta rama también se conserva.

### Arquitectura

```text
Componentes (Catalogo, ProductList, ProductForm, ProductDetail)
    → CatalogProvider + useAsync
    → localProductService / productService
    → HttpClient (para DummyJSON)
    → API REST
```

Los dos servicios de productos exponen el mismo contrato: `getAll`, `getById`, `create`, `update` y `remove`. La selección del servicio se hace en `App.jsx`, al configurar cada ruta. Los componentes presentan el mismo modelo de producto para ambas fuentes.

### Datos y escrituras simuladas

- El catálogo local conserva sus cambios en memoria durante la visita. Recargar la página restaura los productos iniciales.
- DummyJSON simula las altas, actualizaciones y eliminaciones; esos cambios no se guardan permanentemente en el servidor. La aplicación actualiza su lista en memoria para poder revisar el resultado y su detalle.
- Cada alta remota recibe un identificador local único, porque la API puede devolver el mismo identificador en distintas altas. Editar o eliminar esas altas se resuelve en memoria.
- Al salir del catálogo remoto y volver a entrar, o al recargar la página, se consultan otra vez los datos originales de la API.
- JSONPlaceholder también simula las escrituras. Sus formularios muestran la respuesta de cada operación.

[Documentación oficial de productos de DummyJSON](https://dummyjson.com/docs/products)

## Rutas

Todas las rutas excepto `/login` requieren sesión.

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio con enlaces a las prácticas |
| `/login` | Formulario de acceso |
| `/catalogo` | Catálogo local con filtro y CRUD |
| `/catalogo/:id` | Detalle de un producto local |
| `/catalogo-api` | El mismo catálogo con productos de DummyJSON |
| `/catalogo-api/:id` | Detalle de un producto del catálogo remoto |
| `/publicaciones` | LIST, GET, CREATE, UPDATE, DELETE y FILTER con JSONPlaceholder |
| `/detalle/:id` | Detalle de publicación con `useParams` |
| `/placeholderdetalle/:id` | Ruta de detalle conservada de la base del profesor |
| `/ejemplos` | Calculadora, contador, saludo, ejemplos de `useEffect`, montaje y cleanup |
| Cualquier otra | Página 404 |

## Configuración

Se incluyen los valores de demostración del profesor en `front-end/.env` y una referencia en `front-end/.env.example`. Los ajustes personales pueden colocarse en `front-end/.env.local`, que Git ignora.

| Variable | Uso |
| --- | --- |
| `VITE_API_PRODUCTS` | URL base de DummyJSON; por defecto `https://dummyjson.com` |
| `VITE_API_JSONPLACEHOLDER` | URL base de JSONPlaceholder; también se acepta la variable anterior `VITE_API_URL_TEST_JSONPLACEHOLDER` |
| `VITE_API_AUTH` | URL base de HTTPBin para la demostración de sesión |
| `VITE_AUTH_TOKEN` | Token fijo de demostración |
| `VITE_AUTH_SCHEME` | Esquema del encabezado; `Bearer` en esta práctica |
| `VITE_API_URL_ELCRIS` | Servicio de búsqueda usado en los ejemplos de clase |

## Verificación

Desde `front-end`:

```bash
npm run lint
npm test
npm run build
```

`npm test` ejecuta pruebas de servicios con el ejecutor de Node: CRUD local, adaptación del modelo de DummyJSON, identificadores únicos para altas simuladas y propagación de errores. Las peticiones de esas pruebas están simuladas y no dependen de Internet. No corresponden a una suite de Vitest del ejercicio 5.

Para revisar los recorridos en pantalla:

1. Sin sesión, abre `/catalogo/1`: debe llevar al login. Al entrar debe regresar al detalle solicitado.
2. En el catálogo local, filtra por nombre, ordena por precio y agrega un producto con el formulario por pasos.
3. Edita el producto, abre su detalle, vuelve y elimínalo con confirmación.
4. Abre `/catalogo/no-existe` y una URL desconocida: deben mostrar 404.
5. Abre el catálogo en línea y consulta un producto de DummyJSON.
6. Revisa las publicaciones y entra a su detalle desde el título.
7. Recarga la página con sesión activa y después usa **Salir**. Las URL privadas deben volver a exigir acceso.

El login, DummyJSON, JSONPlaceholder y la búsqueda de clase requieren conexión a sus servicios externos.
