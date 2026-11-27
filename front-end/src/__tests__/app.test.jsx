import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { Catalogo } from "../pages/Catalogo";
import { DetalleProducto } from "../pages/DetalleProducto";
import { CatalogoApi } from "../pages/CatalogoApi";
import { allProducts } from "../data/productosMock";
import { productService } from "../services/productService";

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, "", "/");
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("Suite de pruebas TutorIA React", () => {
  it("redirige al login cuando no hay sesión y permite acceder al inicio", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /Inicio de sesión/i })
    ).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Correo:/i), {
      target: { value: "estudiante@unam.mx" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña:/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Acceder/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Plan de Módulos/i })
      ).toBeInTheDocument();
    });
  });

  it("muestra carga asíncrona simulada, renderiza el catálogo y filtra por nombre", async () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <Catalogo
          productos={allProducts}
          onGuardar={vi.fn()}
          onEliminar={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando catálogo/i)).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });
    vi.useRealTimers();

    expect(screen.getByText("Teclado Mecánico RGB")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Escribe un nombre/i);
    fireEvent.change(searchInput, { target: { value: "Mouse" } });

    expect(screen.getByText("Mouse Inalámbrico")).toBeInTheDocument();
    expect(screen.queryByText("Teclado Mecánico RGB")).not.toBeInTheDocument();
  });

  it("muestra el detalle del producto según el parámetro :id de la ruta", () => {
    render(
      <MemoryRouter initialEntries={["/catalogo/3"]}>
        <Routes>
          <Route
            path="/catalogo/:id"
            element={<DetalleProducto productos={allProducts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Monitor Gaming 27" 165Hz/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Pantallas/i)).toBeInTheDocument();
  });

  it("muestra aviso cuando el id de producto no existe", () => {
    render(
      <MemoryRouter initialEntries={["/catalogo/999"]}>
        <Routes>
          <Route
            path="/catalogo/:id"
            element={<DetalleProducto productos={allProducts} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Producto no encontrado/i })
    ).toBeInTheDocument();
  });

  it("carga y muestra productos desde la API externa", async () => {
    vi.spyOn(productService, "getAll").mockResolvedValueOnce([
      {
        id: 101,
        nombre: "Laptop Pro API",
        precio: 1500,
        stock: 4,
        categoria: "laptops",
      },
    ]);

    render(
      <MemoryRouter>
        <CatalogoApi />
      </MemoryRouter>
    );

    expect(screen.getByText(/Consultando API externa/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Laptop Pro API")).toBeInTheDocument();
    });
  });

  it("muestra ErrorPanel cuando la petición a la API falla", async () => {
    vi.spyOn(productService, "getAll").mockRejectedValueOnce(
      new Error("Fallo de conexión simulado")
    );

    render(
      <MemoryRouter>
        <CatalogoApi />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(
        screen.getByText(/Fallo de conexión simulado/i)
      ).toBeInTheDocument();
    });
  });
});
