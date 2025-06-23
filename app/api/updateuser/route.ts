import { NextResponse } from "next/server";
import prisma from "@/app/helpers/prisma";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, password } = body;

    const userupdate = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, name, password },
    });

    return NextResponse.json(userupdate, { status: 200 });
  } catch (e) {
    return NextResponse.json(e,{status:500})
  }
}