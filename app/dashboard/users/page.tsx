'use client'
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import UpdateUser from "@/app/components/updateuser"; // importa tu componente

type User = {
  id: number;
  email: string;
  name?: string;
  password: string;
};

export default function ViewUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [message, setMessage] = useState("");

  // Obtener usuarios
  const fetchUsers = () => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear usuario
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage("Usuario creado");
      setForm({ email: "", name: "", password: "" });
      setShowCreate(false);
      fetchUsers();
      // Limpiar mensaje después de un breve tiempo
      setTimeout(() => setMessage(""), 1500);
    } else {
      setMessage("Error al crear usuario");
    }
  };

  // Eliminar usuario
  const handleDelete = async (id: number) => {
    await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchUsers();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-2xl bg-black/40 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4 gap-2">
          <h2 className="text-2xl font-bold text-white text-left">
            Usuarios registrados
          </h2>
          <div className="flex gap-2">
            <button
              className="bg-black/60 hover:bg-black/50 text-white font-semibold rounded px-4 py-2 transition"
              onClick={() => {
                setShowCreate((v) => !v);
                setShowUpdate(false);
              }}
            >
              {showCreate ? "Cerrar" : "Agregar usuario"}
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-4 py-2 transition"
              onClick={() => {
                setShowUpdate((v) => !v);
                setShowCreate(false);
              }}
            >
              {showUpdate ? "Cerrar" : "Actualizar usuario"}
            </button>
          </div>
        </div>
        {showCreate && (
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-4 mb-6 bg-slate-900 p-4 rounded-3xl"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
            />
            <input
              type="text"
              name="name"
              placeholder="Nombre (opcional)"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="p-2 rounded bg-slate-700 text-white placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded p-2 transition"
            >
              Guardar usuario
            </button>
            {message && (
              <div className="text-center text-white mt-2">{message}</div>
            )}
          </form>
        )}
        {showUpdate && (
          <UpdateUser fetchUsers={fetchUsers} onClose={() => setShowUpdate(false)} />
        )}
        <table className="w-full table-auto border-collapse">
          {users.length > 0 ? (
            <>
              <thead>
                <tr className="text-white">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={idx % 2 === 0 ? "bg-slate-50" : "bg-slate-50"}
                  >
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.name || "-"}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-lg"
                        title="Eliminar usuario"
                      >
                        <MdDelete size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <tbody>
              <tr>
                <td colSpan={4} className="text-center text-white py-8">
                  No hay usuarios registrados.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

