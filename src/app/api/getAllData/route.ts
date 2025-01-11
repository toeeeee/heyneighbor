import { NextResponse } from 'next/server';
import { run } from '../../../getAllData';

export async function GET() {
    try {
        await run();
        return NextResponse.json({ message: 'Successfully connected to MongoDB!' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
    }
}