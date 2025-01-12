// app/api/user/[userId]/trade/route.ts
import { TradeModel } from "@/models/models";
import { connectMongo } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

await connectMongo(); 

// GET /api/user/trade/[userId]?who=
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const userId = (await params).userId;
        const searchParams = request.nextUrl.searchParams;
        const who = searchParams.get("who");

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }
        if (who !== "requestor" && who !== "requestee") {
            return NextResponse.json(
                { error: "Invalid 'who' parameter" },
                { status: 400 }
            );
        }
        const userIdObjectId = new ObjectId(userId);
        if (who === "requestor") {
            const trades = await TradeModel.find({
                requestorId: userIdObjectId,
            });
            return NextResponse.json({
                role: who,
                trades,
            });
            // Handle requestor logic
        } else if (who === "requestee") {
            const trades = await TradeModel.find({
                requesteeId: userIdObjectId,
            });
            return NextResponse.json({
                role: who,
                trades,
            });
        }
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
