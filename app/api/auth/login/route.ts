// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { createSession, Default_user } from '@/app/helpers/auth';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email y contraseña son requeridos.' }, { status: 400 });
  }

  if (email === Default_user.email && password === Default_user.password) {
    await createSession();
    const { password: _, ...userWithoutPassword } = Default_user;
    return NextResponse.json({ message: 'Login exitoso', user: userWithoutPassword });
  } else {
    return NextResponse.json({ message: 'Credenciales inválidas.' }, { status: 401 });
  }
}