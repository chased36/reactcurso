import { clients } from "./clients";

const configuredToken = import.meta.env.VITE_AUTH_TOKEN;
const configuredScheme = import.meta.env.VITE_AUTH_SCHEME || "Bearer";

function configureToken() {
  clients.auth.setAccessToken(configuredToken, configuredScheme);
}

export const authService = {
  async login({ email }, signal) {
    configureToken();

    const bearer = await clients.auth.get("/bearer", { signal });

    if (!bearer.authenticated) {
      throw new Error("No se pudo autenticar");
    }

    return {
      authenticated: true,
      user: {
        email,
        name: email || "Usuario",
      },
    };
  },

  async getProfile(signal) {
    configureToken();
    const bearer = await clients.auth.get("/bearer", { signal });

    if (!bearer.authenticated) {
      throw new Error("Sesión no autenticada");
    }

    return {
      email: "usuario@demo.local",
      name: "Usuario autenticado",
    };
  },

  async refresh(signal) {
    configureToken();
    return clients.auth.get("/bearer", { signal });
  },

  async logout(signal) {
    void signal;
    clients.auth.setAccessToken(null);
  },
};
