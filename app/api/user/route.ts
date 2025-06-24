import { NextResponse } from "next/server";
import prisma from "@/app/helpers/prisma";

//create user 
export async function POST(request: Request) {
    const body = await request.json();
    const {email,name,password} = body;
    try{
        const user = await prisma.user.create({
            data: {email,name,password},
        });
        return NextResponse.json(user,{status: 201});
    }catch(e){
        return NextResponse.json({error: "Error al crear usuario" + e}, {status: 500});
    }
}

//update user
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

//all user
export async function GET(){
    try{
        const users = await prisma.user.findMany();
        return NextResponse.json(users,{status: 200})
    }catch(e){
        return NextResponse.json(e,{status:500})
    }
}

//delete user
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