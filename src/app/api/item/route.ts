import { NextRequest, NextResponse } from "next/server";
import { ItemModel, UserModel } from "@/models/models"; // Adjust the import path as needed
import { connectMongo } from "@/utils/mongodb";

type ItemRequestBody = {
    userId: string;
    itemName: string;
    itemDescription: string;
};
await connectMongo();//TESTING

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateRequestBody(body: any): body is ItemRequestBody {
    return (
        typeof body === "object" &&
        typeof body.userId === "string" &&
        typeof body.itemName === "string" &&
        typeof body.itemDescription === "string"
    );
}

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

        const user = await UserModel.findOne({ id: userId });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const newItem = await ItemModel.create({
            userId: userId,
            itemName,
            itemDescription,
        });

        return NextResponse.json(
            {
                message: "Item created successfully",
                item: {
                    id: newItem.id,
                    userId: newItem.userId,
                    itemName: newItem.itemName,
                    itemDescription: newItem.itemDescription,
                },
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

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        if (!validateRequestBody(body)) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { userId, itemName, itemDescription } = body;

        // Verify that the user exists
        const user = await UserModel.findOne({ id: userId });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Find and update the item
        const updatedItem = await ItemModel.findOneAndUpdate(
            {
                userId: userId,
                itemName: itemName,
            },
            {
                itemDescription,
            },
            {
                new: true,
            }
        );

        if (!updatedItem) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Item updated successfully",
                item: {
                    id: updatedItem.id,
                    userId: updatedItem.userId,
                    itemName: updatedItem.itemName,
                    itemDescription: updatedItem.itemDescription,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();

        if (!validateRequestBody(body)) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { userId, itemName } = body;

        const user = await UserModel.findOne({ id: userId });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const deletedItem = await ItemModel.findOneAndDelete({
            userId: userId,
            itemName: itemName,
        });

        if (!deletedItem) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Item deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
