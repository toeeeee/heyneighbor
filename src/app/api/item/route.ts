import { UserModel, ItemModel } from "@/models/models";
import { connectMongo } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type ItemRequestBody = {
    userId: string;
    itemName: string;
    itemDescription: string;
};
await connectMongo();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateRequestBody(body: any): body is ItemRequestBody {
    return (
        typeof body === "object" &&
        typeof body.userId === "string" &&
        typeof body.itemName === "string" &&
        typeof body.itemDescription === "string"
    );
}
await connectMongo();//TESTING

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!validateRequestBody(body)) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { userId, itemName, itemDescription } = body;
        const userIdObjectId = new ObjectId(userId);
        
        const user = await UserModel.findById(userIdObjectId);
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        console.log({userIdObjectId, itemName, itemDescription})//TESTING
        const newItem = await ItemModel.create({
            userId: userIdObjectId,
            itemName,
            itemDescription,
        });

        return NextResponse.json(
            {
                message: "Item created successfully",
                // item: {
                //     id: newItem.id,
                //     userId: newItem.userId,
                //     itemName: newItem.itemName,
                //     itemDescription: newItem.itemDescription,
                // },
                item: newItem,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}