import { NextResponse } from "next/server";
import prisma from "@/app/helpers/prisma";

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