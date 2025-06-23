import { NextResponse } from "next/server";
import prisma from "@/app/helpers/prisma";

export async function GET(){
    try{
        const users = await prisma.user.findMany();
        return NextResponse.json(users,{status: 200})
    }catch(e){
        return NextResponse.json(e,{status:500})
    }
}