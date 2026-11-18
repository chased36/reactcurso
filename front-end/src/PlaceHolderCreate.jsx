import { useState } from "react";
import { createPost } from "./services/postService";

export function PlaceHolderCreate() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [respuesta, setRespuesta] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const creado = await createPost({
      ...formData,
      userId: Number(formData.userId),
    });
    setRespuesta(creado);
  };

  return (
    <div>
      <h3>Crear Post (POST)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="body"
          placeholder="Contenido"
          value={formData.body}
          onChange={handleChange}
        />
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleChange}
        />
        <button type="submit">Guardar</button>
      </form>

      {respuesta && (
        <p>
          Post creado con ID <strong>{respuesta.id}</strong>: {respuesta.title}
        </p>
      )}
    </div>
  );
}