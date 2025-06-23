import { cookies } from "next/headers";

export const Default_user = {
  id: '1',
  email: 'prueba@gmail.com',
  name: 'prueba',
  password: '123',
};

const Cookie_Name = 'session_test';

export async function createSession() {
  (await cookies()).set(Cookie_Name, Default_user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
  });
}

export async function verifySession(): Promise<{ id: string; email: string; name: string } | null> {
  const sessionCookie = (await cookies()).get(Cookie_Name)?.value;
  if (!sessionCookie) return null;
  if (sessionCookie === Default_user.id) {
    const { password, ...userWithoutPassword } = Default_user;
    return userWithoutPassword;
  }
  return null;
}

export async function deleteSession() {
  (await cookies()).delete(Cookie_Name);
}