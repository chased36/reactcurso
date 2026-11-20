import { Navigate } from "react-router-dom";
import { useAuth } from "./services/useAuth";

export function ProtectedRoute({ children }) {
  const { status } = useAuth();

  if (status === "loading") return <p>Cargando sesión...</p>;

  if (status === "anonymous") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
