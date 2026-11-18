export class HttpError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

export class HttpClient {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(endpoint, { method = "GET", body, headers, signal } = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      method,
      signal, 
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    };

    let response;
    try {
      response = await fetch(url, config);
    } catch (err) {
      if (err.name === "AbortError") throw err; 
      throw new HttpError(`No se pudo conectar con ${url}`, 0, { cause: err.message });
    }

    if (response.status === 204) return null;

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new HttpError(`HTTP ${response.status}: ${response.statusText}`, response.status, errorBody);
    }

    return response.json();
  }

  get(endpoint, options) { return this.request(endpoint, { ...options, method: "GET" }); }
  post(endpoint, body, options) { return this.request(endpoint, { ...options, method: "POST", body }); }
  put(endpoint, body, options) { return this.request(endpoint, { ...options, method: "PUT", body }); }
  delete(endpoint, options) { return this.request(endpoint, { ...options, method: "DELETE" }); }
}

