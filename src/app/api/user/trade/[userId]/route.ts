// app/api/user/[userId]/trade/route.ts
import { TradeModel } from "@/models/models";
import { connectMongo } from "@/utils/mongodb";
// import { ObjectId } from "mongodb";
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

        // console.log(userId, searchParams)

        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }
        // Validate 'who' parameter
        if (!who || (who !== "requestor" && who !== "requestee")) {
            return NextResponse.json(
                { error: "Invalid 'who' parameter. Must be either 'requestor' or 'requestee'" },
                { status: 400 }
            );
        }
        // const userIdObjectId = new ObjectId(userId);
        // if (who === "requestor") {
        //     const trades = await TradeModel.find({
        //         requestorId: userIdObjectId,
        //     });
        //     return NextResponse.json({
        //         role: who,
        //         trades,
        //     });
        //     // Handle requestor logic
        // } else if (who === "requestee") {
        //     const trades = await TradeModel.find({
        //         requesteeId: userIdObjectId,
        //     });
        //     return NextResponse.json({
        //         role: who,
        //         trades,
        //     });
        // }
            // Use a single query pattern with dynamic field selection
            const queryField = `${who}Id`;
            const trades = await TradeModel.find({ [queryField]: userId })
                .populate('requestorId')
                .populate('requesteeId')
                .populate('requestorItemId')
                .populate('requesteeItemId');
                // .lean();
            console.log('trades:', trades);//TESTING
    
            return NextResponse.json({
                role: who,
                trades,
                count: trades.length
            });
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
