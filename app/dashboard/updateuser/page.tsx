'use client'
import React, { useState } from "react";

export default function UpdateUser() {
  const [form, setForm] = useState({ id: "", email: "", name: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/updateuser", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-8 rounded-xl shadow-lg bg-black/40"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-2">Actualizar Usuario</h2>
        <input
          type="text"
          name="id"
          placeholder="ID del usuario"
          required
          value={form.id}
          onChange={handleChange}
          className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Nuevo Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="name"
          placeholder="Nuevo Nombre (opcional)"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Nueva Contraseña"
          value={form.password}
          onChange={handleChange}
          className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded p-3 transition"
        >
          Actualizar usuario
        </button>
      </form>
    </div>
  );
}