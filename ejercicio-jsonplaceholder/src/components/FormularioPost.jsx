import { useEffect, useState } from 'react';

export function FormularioPost({
  postAEditar,
  onCrearPost,
  onActualizarPost,
  onCancelarEdicion,
  enviando = false,
}) {
  const [userId, setUserId] = useState('1');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (postAEditar) {
      setUserId(String(postAEditar.userId ?? 1));
      setTitle(postAEditar.title ?? '');
      setBody(postAEditar.body ?? '');
    } else {
      setUserId('1');
      setTitle('');
      setBody('');
    }
  }, [postAEditar]);

  function handleSubmit(e) {
    e.preventDefault();

    const tituloLimpio = title.trim();
    const cuerpoLimpio = body.trim();
    const usuarioNumero = Number(userId);

    if (!tituloLimpio || !cuerpoLimpio || Number.isNaN(usuarioNumero)) {
      return;
    }

    const payload = {
      userId: usuarioNumero,
      title: tituloLimpio,
      body: cuerpoLimpio,
    };

    if (postAEditar) {
      onActualizarPost(postAEditar.id, payload);
      return;
    }

    onCrearPost(payload);
    setTitle('');
    setBody('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'grid',
        gap: '0.75rem',
        border: '1px solid #666',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <h2>
        {postAEditar
          ? `Editar Post #${postAEditar.id} (PUT)`
          : 'Crear Nuevo Post (POST)'}
      </h2>

      <label>
        Usuario (userId):{' '}
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <option key={id} value={String(id)}>
              Usuario {id}
            </option>
          ))}
        </select>
      </label>

      <label>
        Título:{' '}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Escribe el título del post"
        />
      </label>

      <label>
        Contenido:{' '}
        <textarea
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Escribe el cuerpo del post"
        />
      </label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" disabled={enviando}>
          {enviando
            ? 'Enviando...'
            : postAEditar
              ? 'Guardar cambios (PUT)'
              : 'Crear post (POST)'}
        </button>

        {postAEditar && (
          <button type="button" onClick={onCancelarEdicion} disabled={enviando}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
