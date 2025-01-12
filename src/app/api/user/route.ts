import { UserModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { username } = body;
        if (!username) {
            return NextResponse.json({ error: "no username" }, { status: 400 });
        }
        const newUser = new UserModel({ name: username });
        return NextResponse.json({ user: newUser });
    } catch (error) {
        console.error(`error:`, error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
