'use client'
import React, { useState } from "react";

export default function DeleteUser() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/deleteuser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setMessage("Usuario eliminado correctamente.");
      setId("");
    } else {
      setMessage("Error al eliminar usuario.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md p-8 rounded-xl shadow-lg bg-slate-800"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-2">Eliminar Usuario</h2>
        <input
          type="text"
          name="id"
          placeholder="ID del usuario"
          required
          value={id}
          onChange={handleChange}
          className="p-3 rounded bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded p-3 transition"
        >
          Eliminar usuario
        </button>
        {message && (
          <div className="text-center text-white mt-2">{message}</div>
        )}
      </form>
    </div>
  );
}