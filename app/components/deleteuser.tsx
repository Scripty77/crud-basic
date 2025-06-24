'use client'
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

type User = {
  id: number;
  email: string;
  name?: string;
};

interface DeleteUserProps {
  users: User[];
  fetchUsers: () => void;
}

export default function DeleteUser({ users, fetchUsers }: DeleteUserProps) {
  const [message, setMessage] = useState("");

  const handleDelete = async (id: number) => {
    setMessage("");
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setMessage("Usuario eliminado correctamente.");
      fetchUsers();
      setTimeout(() => setMessage(""), 1500);
    } else {
      setMessage("Error al eliminar usuario.");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-black/40 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4 text-left">
        Usuarios registrados
      </h2>
      {message && (
        <div className="text-center text-white mb-2">{message}</div>
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
  );
}