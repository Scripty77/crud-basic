'use client'
import React, { useEffect, useState } from "react";
import CreateUser from "../../components/createuser";
import UpdateUser from "../../components/updateuser";
import DeleteUser from "../../components/deleteuser";

type User = {
  id: number;
  email: string;
  name?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  // Centraliza el fetch de usuarios
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl bg-black/40 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-left">
          Usuarios registrados
        </h2>
        <DeleteUser users={users} fetchUsers={fetchUsers} />
        {/* Crear usuario */}
        <CreateUser fetchUsers={fetchUsers} />
        {/* Actualizar usuario */}
        <UpdateUser fetchUsers={fetchUsers} />
        {/* Eliminar y listar usuarios */}
      </div>
    </div>
  );
}

