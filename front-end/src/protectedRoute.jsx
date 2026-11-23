import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./services/useAuth";

export function ProtectedRoute({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <p>Cargando sesión...</p>;
  if (status !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
