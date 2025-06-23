import React from "react";
import { verifySession } from "@/app/helpers/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await verifySession();
  if (!user) {
    redirect("/"); 
  }
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <h1 className="text-8xl font-bold text-white mb-4">¡Hola, bienvenido!</h1>
      <p className="text-4xl text-slate-200 mb-2">Este es tu panel de control CRUD.</p>
      <p className="text-3xl text-white">Selecciona una opción en el menú lateral para comenzar.</p>
    </div>
  );
}
