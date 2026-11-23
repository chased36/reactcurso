import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { CatalogContext } from "../hooks/catalogContext";
import { ErrorPanel } from "./ErrorPanel";

export function CatalogProvider({ service, title, description }) {
  const { data, loading, error, recargar, setData } = useAsync(
    (signal) => service.getAll(signal), [service],
  );
  const [saving, setSaving] = useState(false);
  const [mutationError, setMutationError] = useState(null);

  async function saveProduct(product, id) {
    setSaving(true);
    setMutationError(null);
    try {
      const result = id ? await service.update(id, product) : await service.create(product);
      setData((products) => id
        ? products.map((item) => item.id === id ? result : item)
        : [...products, result]);
      return true;
    } catch (err) {
      setMutationError(err);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function removeProduct(id) {
    setSaving(true);
    setMutationError(null);
    try {
      await service.remove(id);
      setData((products) => products.filter((item) => item.id !== id));
    } catch (err) {
      setMutationError(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p role="status">Cargando productos...</p>;
  if (error) return <ErrorPanel error={error} onRetry={recargar} />;

  return (
    <CatalogContext.Provider value={{
      products: data ?? [], title, description, saving, mutationError, saveProduct, removeProduct,
      clearError: () => setMutationError(null),
    }}>
      <Outlet />
    </CatalogContext.Provider>
  );
}
