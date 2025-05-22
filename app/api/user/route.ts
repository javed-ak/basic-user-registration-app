import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        await client.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email
            }
        })
        return NextResponse.json({
            body
        })
    } catch( err ) {
        return NextResponse.json({
            message: 'You are not registered'
        })
    }
}

export async function GET(req: NextRequest) {
    try {
        const users = await client.user.findMany();
        return NextResponse.json({
            users
        })
    } catch (err) {
        return NextResponse.json({
            message: 'Failed to get users!'
        })
    }
}