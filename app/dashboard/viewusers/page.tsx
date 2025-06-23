'use client'
import React, { useEffect, useState } from "react";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/alluser")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full max-w-2xl bg-black/40 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Usuarios registrados
        </h2>
        <table className="w-full table-auto border-collapse border-4">
          <thead>
            <tr className="text-white">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, idx) => (
              <tr
                key={user.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.name || "-"}</td>
                <td className="p-3">{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

