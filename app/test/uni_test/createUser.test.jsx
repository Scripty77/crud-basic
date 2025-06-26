import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateUser from "../../components/createuser";

describe('CreateUser', () => {
  it("Correcto Renderizado del componente", () => {
    render(<CreateUser fetchUsers={jest.fn()}/>);
    expect(screen.getByText(/Agregar Usuario/i)).toBeInTheDocument();
  });

  it("muestra el botón y despliega el formulario al hacer click", () => {
    render(<CreateUser fetchUsers={jest.fn()} />);
    
    const openButton = screen.getByText(/Agregar usuario/i);
    expect(openButton).toBeInTheDocument();

    expect(screen.queryByPlaceholderText(/Email/i)).not.toBeInTheDocument();

    fireEvent.click(openButton);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Nombre \(opcional\)/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByText(/Guardar usuario/i)).toBeInTheDocument();
  });
});