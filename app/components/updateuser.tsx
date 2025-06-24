'use client'
import React, { useState } from "react";

interface UpdateUserProps {
  fetchUsers: () => void;
  onClose: () => void;
}

export default function UpdateUser({ fetchUsers, onClose }: UpdateUserProps) {
  const [form, setForm] = useState({ id: "", email: "", name: "", password: "" });
  const [message, setMessage] = useState("");

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
        onClose();
      }, 1500);
    } else {
      setMessage("Error al actualizar usuario.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6 bg-slate-900 p-4 rounded-3xl"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-white">Actualizar Usuario</h2>
        <button
          type="button"
          onClick={() => {
            setForm({ id: "", email: "", name: "", password: "" });
            setMessage("");
            onClose();
          }}
          className="text-white bg-red-600 hover:bg-red-700 rounded px-3 py-1 font-semibold"
        >
          Cerrar
        </button>
      </div>
      <input
        type="text"
        name="id"
        placeholder="ID del usuario"
        required
        value={form.id}
        onChange={handleChange}
        className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
      />
      <input
        type="email"
        name="email"
        placeholder="Nuevo Email"
        value={form.email}
        onChange={handleChange}
        className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
      />
      <input
        type="text"
        name="name"
        placeholder="Nuevo Nombre (opcional)"
        value={form.name}
        onChange={handleChange}
        className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Nueva Contraseña"
        value={form.password}
        onChange={handleChange}
        className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded p-2 transition"
      >
        Actualizar usuario
      </button>
      {message && (
        <div className="text-center text-white mt-2">{message}</div>
      )}
    </form>
  );
}