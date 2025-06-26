'use client'
import React, { useState } from "react";

interface UpdateUserProps {
  fetchUsers: () => void;
}

export default function UpdateUser({ fetchUsers }: UpdateUserProps) {
  const [form, setForm] = useState({ id: "", email: "", name: "", password: "" });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Usuario actualizado correctamente.");
      setForm({ id: "", email: "", name: "", password: "" });
      fetchUsers();
      setTimeout(() => {
        setMessage("");
        setOpen(false);
      }, 1200);
    } else {
      setMessage("Error al actualizar usuario.");
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg p-3 transition w-full shadow-lg"
        >
          Actualizar usuario
        </button>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-slate-900/90 border border-yellow-700 relative animate-fade-in"
          >
            <button
              type="button"
              onClick={() => {
                setForm({ id: "", email: "", name: "", password: "" });
                setMessage("");
                setOpen(false);
              }}
              className="absolute top-3 right-5 text-white text-2xl hover:text-red-400"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white text-center mb-2">Actualizar Usuario</h2>
            <input
              type="text"
              name="id"
              placeholder="ID del usuario"
              required
              value={form.id}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Nuevo Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Nuevo Nombre (opcional)"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Nueva Contraseña"
              value={form.password}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg p-3 transition shadow"
            >
              Actualizar usuario
            </button>
            {message && (
              <div className="text-center text-white mt-2">{message}</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}