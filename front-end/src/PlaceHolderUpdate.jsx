import { useState } from "react";
import { updatePost } from "./services/postService";

export function PlaceHolderUpdate() {
  const [formData, setFormData] = useState({
    id: 1,
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
    const actualizado = await updatePost(formData.id, {
      title: formData.title,
      body: formData.body,
      userId: Number(formData.userId),
    });
    setRespuesta(actualizado);
  };

  return (
    <div>
      <h3>Actualizar Post (PUT)</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="id"
          placeholder="ID del post"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Nuevo título"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="body"
          placeholder="Nuevo contenido"
          value={formData.body}
          onChange={handleChange}
        />
        <button type="submit">Actualizar</button>
      </form>

      {respuesta && (
        <p>
          Post <strong>#{respuesta.id}</strong> actualizado: {respuesta.title}
        </p>
      )}
    </div>
  );
}