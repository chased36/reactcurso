import { createContext, useEffect, useState } from 'react';
import { authService } from './authService';
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function restoreSession() {
      if (sessionStorage.getItem("auth-demo") !== "true") {
        setUser(null);
        setStatus("anonymous");
        return;
      }

      try {
        const profile = await authService.getProfile();
        setUser(profile);
        setStatus("authenticated");
      } catch {
        sessionStorage.removeItem("auth-demo");
        setUser(null);
        setStatus("anonymous");
      }
    }

    restoreSession();
  }, []);

  async function login(credentials) {
    const result = await authService.login(credentials);

    sessionStorage.setItem("auth-demo", "true");
    setUser(result.user);
    setStatus("authenticated");
  }

  async function logout() {
    await authService.logout();
    sessionStorage.removeItem("auth-demo");
    setUser(null);
    setStatus("anonymous");
  }

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}