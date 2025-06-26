jest.mock('next/font/google', () => ({
  Roboto: () => ({ style: { fontFamily: 'Roboto' } }),
  Bebas_Neue: () => ({ style: { fontFamily: 'Bebas Neue' } }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

import React from "react";
import { render, screen } from "@testing-library/react";
import UsersPage from "../page";

describe("UserDashboard", () => {
  it('muestra los textos principales', async () => {
    render(<UsersPage />);
    expect(await screen.findByText(/Usuarios registrados/i)).toBeInTheDocument();
    expect(await screen.findByText(/No hay usuarios registrados/i)).toBeInTheDocument();
  });
});