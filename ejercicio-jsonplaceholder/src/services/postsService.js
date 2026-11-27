const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

async function manejarRespuesta(response, mensajeError) {
  if (!response.ok) {
    throw new Error(`${mensajeError} (HTTP ${response.status})`);
  }
  return response.json();
}

// LIST: obtener todos los posts (opcionalmente filtrados por userId)
export async function listarPosts(userId = '', signal) {
  const url = userId
    ? `${BASE_URL}?userId=${encodeURIComponent(userId)}`
    : BASE_URL;

  const response = await fetch(url, { signal });
  return manejarRespuesta(response, 'Error al listar los posts');
}

// GET: obtener un post por ID
export async function obtenerPostPorId(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });
  return manejarRespuesta(response, `Error al obtener el post ${id}`);
}

// CREATE: crear un nuevo post
export async function crearPost(nuevoPost) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(nuevoPost),
  });
  return manejarRespuesta(response, 'Error al crear el post');
}

// UPDATE: actualizar un post existente
export async function actualizarPost(id, datosActualizados) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(datosActualizados),
  });
  return manejarRespuesta(response, `Error al actualizar el post ${id}`);
}

// DELETE: eliminar un post por ID
export async function eliminarPost(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return manejarRespuesta(response, `Error al eliminar el post ${id}`);
}
