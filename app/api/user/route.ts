import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

// Create user
export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        // Check if email already exists
        const existingUser = await client.user.findUnique({
            where: { email: body.email }
        });

        if (existingUser) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
        }

        await client.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email
            }
        });

        return NextResponse.json({ message: 'User registered successfully' });
    } catch (err) {
        return NextResponse.json({ message: 'Registration failed' }, { status: 500 });
    }
};

// Get all users
export async function GET(req: NextRequest) {
    try {
        const users = await client.user.findMany();
        return NextResponse.json({ users });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to get users!' });
    }
}

// Update existing user
export async function PUT(req: NextRequest) {
    const body = await req.json();
    try {
        // Check if the new email is already used by a different user
        const existingUser = await client.user.findUnique({
            where: { email: body.email }
        });

        if (existingUser && existingUser.id !== body.id) {
            return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
        }

        const updatedUser = await client.user.update({
            where: { id: body.id },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email
            }
        });

        return NextResponse.json({ updatedUser });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }
};

// Delete user by id
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get('id'));

    try {
        await client.user.delete({
            where: { id }
        });
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to delete user' });
    }
}
