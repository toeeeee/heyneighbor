// app/api/item/[userId]/route.ts
import { ItemModel } from "@/models/models";
import { connectMongo } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET /api/item/[userId]
export async function GET(
    request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        await connectMongo();//TRY?
        const userId = params.userId;

        // // Example: Get searchParams from URL if needed
        // const searchParams = request.nextUrl.searchParams
        // const query = searchParams.get('query')

        // Example: Validate userId
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }
        const items = await ItemModel.find({ 
            userId: userId 
         });
        console.log(items);

        return NextResponse.json({ items });
    } catch (error) {
        console.error("Error fetching items:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}