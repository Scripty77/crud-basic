'use client'
import React, { useState } from "react";

export default function CreateUser() {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [postMessage, setPostMessage] = useState("");

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
      setTimeout(() => setPostMessage(""), 1500);
    } else {
      setPostMessage("Error al crear usuario.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-md p-8 rounded-xl shadow-lg bg-black/40"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-2">Agregar Usuario</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={handleChange}
        className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="name"
        placeholder="Nombre (opcional)"
        value={form.name}
        onChange={handleChange}
        className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        required
        value={form.password}
        onChange={handleChange}
        className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded p-3 transition"
      >
        Agregar usuario
      </button>
      {postMessage && (
        <div className="text-center text-white mt-2">{postMessage}</div>
      )}
    </form>
  );
}