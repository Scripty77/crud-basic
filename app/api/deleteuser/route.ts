import { NextResponse } from "next/server";
import prisma from "@/app/helpers/prisma";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 });
  }
}