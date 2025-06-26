import React from "react";

import { render, screen } from "@testing-library/react";
import DashboardUI from "../components/DashboardUI";

describe("DashboardUI", () => {
  it("muestra el mensaje de bienvenida y textos principales", () => {
    render(<DashboardUI />);
    expect(screen.getByText(/¡Hola, bienvenido!/i)).toBeInTheDocument();
    expect(screen.getByText(/Este es tu panel de control CRUD/i)).toBeInTheDocument();
    expect(screen.getByText(/Selecciona una opción en el menú lateral/i)).toBeInTheDocument();
  });
});
