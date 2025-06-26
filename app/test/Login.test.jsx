import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../page"; 

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock('next/font/google', () => ({
  Roboto: () => ({ style: { fontFamily: 'Roboto' } }),
  Bebas_Neue: () => ({ style: { fontFamily: 'Bebas Neue' } }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe("LoginPage", () => {
  it("permite hacer login exitoso y redirige", async () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), {
      target: { value: "prueba@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() =>
      expect(screen.getByText(/Login exitoso/i)).toBeInTheDocument()
    );
  });
});