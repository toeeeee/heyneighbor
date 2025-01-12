import { NextResponse } from 'next/server';
import connect from '../../../utils/mongodb2';

export async function GET() {
    try {
        const client = await connect;
        const cursor = await client.db("test").collection("users").find();
        const greetings = await cursor.toArray();
        return Response.json(greetings);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
    }
}