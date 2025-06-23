'use client'
import React, { useState } from "react";
import { bebas_neue } from "./ui/fonts";
import { redirect } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Login exitoso");
      redirect('/dashboard')
    } else {
      setMessage(data.message || "Error de autenticación");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/40 backdrop-blur text-white border border-gray-700 rounded-lg p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold drop-shadow">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="flex items-center justify-between drop-shadow">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="mt-1 block w-full bg-gray-800/80 border border-gray-700 text-white rounded-md p-2 placeholder-gray-400"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-white drop-shadow">
                Password
              </label>
              <a className="text-sm text-gray-300 hover:text-white underline">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full bg-gray-800/80 border border-gray-700 text-white rounded-md p-2 placeholder-gray-400"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`${bebas_neue.className} w-full bg-white/90 text-black py-2 px-4 rounded hover:bg-white/70 font-semibold shadow`}
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-400 drop-shadow">{message}</p>
        )}
        <p className="mt-4 text-center text-sm text-gray-200 drop-shadow">
          Don&apos;t have an account?
          <a className="text-white hover:underline font-semibold" href="/register">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
