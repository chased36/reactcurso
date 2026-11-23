import { useEffect, useState } from 'react';
import { authService } from './authService';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    async function restoreSession() {
      if (sessionStorage.getItem("auth-demo") !== "true") {
        setUser(null);
        setStatus("anonymous");
        return;
      }

      try {
        const profile = await authService.getProfile(controller.signal);
        if (controller.signal.aborted) return;
        const email = sessionStorage.getItem("auth-demo-email") || profile.email;
        setUser({ ...profile, email, name: email });
        setStatus("authenticated");
      } catch {
        if (controller.signal.aborted) return;
        sessionStorage.removeItem("auth-demo");
        sessionStorage.removeItem("auth-demo-email");
        setUser(null);
        setStatus("anonymous");
      }
    }

    restoreSession();
    return () => controller.abort();
  }, []);

  async function login(credentials) {
    const result = await authService.login(credentials);

    sessionStorage.setItem("auth-demo", "true");
    sessionStorage.setItem("auth-demo-email", result.user.email);
    setUser(result.user);
    setStatus("authenticated");
  }

  async function logout() {
    await authService.logout();
    sessionStorage.removeItem("auth-demo");
    sessionStorage.removeItem("auth-demo-email");
    setUser(null);
    setStatus("anonymous");
  }

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
