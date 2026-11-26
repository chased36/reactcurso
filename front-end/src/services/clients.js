import { HttpClient } from "../HttpClient";

export const clients = {
  elcris: new HttpClient(import.meta.env.VITE_API_URL_ELCRIS ?? "https://scraper.iguzman.com.mx"),
  auth: new HttpClient(import.meta.env.VITE_API_AUTH ?? "https://httpbin.org"),
  jsonPlaceholder: new HttpClient(
    import.meta.env.VITE_API_JSONPLACEHOLDER ??
    import.meta.env.VITE_API_URL_TEST_JSONPLACEHOLDER ??
    "https://jsonplaceholder.typicode.com",
  ),
  products: new HttpClient(import.meta.env.VITE_API_PRODUCTS ?? "https://dummyjson.com"),
};
