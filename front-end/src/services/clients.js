import { HttpClient } from "./HttpClient";

export const clients = {
  dummy: new HttpClient(import.meta.env.VITE_API_DUMMYJSON ?? "https://dummyjson.com"),
};
