'use client'
import React, { useState } from "react";

type CreateUserProps = {
  fetchUsers: () => void;
};

export default function CreateUser({ fetchUsers }: CreateUserProps) {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [postMessage, setPostMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostMessage("");
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setPostMessage("Usuario creado");
      setForm({ email: "", name: "", password: "" });
      fetchUsers();
      setTimeout(() => {
        setPostMessage("");
        setOpen(false);
      }, 1200);
    } else {
      setPostMessage("Error al crear usuario.");
    }
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3 transition w-full shadow-lg"
        >
          Agregar usuario
        </button>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-slate-900/90 border border-blue-700 relative animate-fade-in"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-5 text-white text-2xl hover:text-red-400"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white text-center mb-2">Agregar Usuario</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Nombre (opcional)"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={form.password}
              onChange={handleChange}
              className="p-3 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3 transition shadow"
            >
              Guardar usuario
            </button>
            {postMessage && (
              <div className="text-center text-white mt-2">{postMessage}</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
