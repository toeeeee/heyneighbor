import { NextRequest, NextResponse } from "next/server";
import { ItemModel } from "@/models/models"; // Adjust the import path as needed
import { connectMongo } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
await connectMongo(); //TESTING

// api/item/[id]
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        console.log("id:", id); //ID
        const body = await request.json();
        if (!id) {
            return NextResponse.json({ error: "no id" }, { status: 400 });
        }
        
        const { userId, itemName, itemDescription, amt} = body; // change id to be a path param to be good convention later
        // amt can be negative
        const itemObjectId = new ObjectId(id);
        const item = await ItemModel.findById(itemObjectId);
        console.log(item);
        const updatedItem = await ItemModel.findOneAndUpdate(
            {
                _id: itemObjectId,
            },
            {
                userId: userId || item.userId,
                itemName: itemName || item.itemName,
                itemDescription: itemDescription || item.itemDescription,
                $inc: {quantity: amt}
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
                // item: {
                //     id: updatedItem.id,
                //     userId: updatedItem.userId,
                //     itemName: updatedItem.itemName,
                //     itemDescription: updatedItem.itemDescription,
                // },
                item: updatedItem
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

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        // const body = await request.json();

        if (!id) {
            return NextResponse.json({ error: "no id" }, { status: 400 });
        }
        // const idObjectId = new ObjectId(id);

        const deletedItem = await ItemModel.findOneAndDelete({
            _id: id,
            // userId: userId,
            // itemName: itemName,
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

