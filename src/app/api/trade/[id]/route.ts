import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { statusEnum, TradeModel } from '@/models/models';
await connectMongo();//TESTING

// api/trade/[id]
export async function PUT(
    request: NextRequest,
    { params} :  { params: Promise<{ id: string }> }
){
    try {
        const id = (await params).id;
        console.log('id:', id)//ID
        const body = await request.json();
        if(!id){
            return NextResponse.json(
                { error: "no id" },
                { status: 400 }
            );
        }
        const status = body.status;
        // const { status } = body; // change id to be a path param to be good convention later

        const tradeObjectId = new ObjectId(id);
        const trade = await TradeModel.findById(tradeObjectId);
        console.log(trade);

        if (!statusEnum.values.includes(status)) {
            return NextResponse.json(
            { error: "Invalid status" },
            { status: 400 }
            );
        }

        const updatedTrade = await TradeModel.findOneAndUpdate(
            {
                _id: tradeObjectId,
            },
            {
                status: status,
            },
            {
                new: true,
            }
        );

        return NextResponse.json(
            {
                message: "Item updated successfully",
                // trade: {
                //     id: updatedTrade.id,
                //     requestorId: updatedTrade.requestorId,
                //     requestorItemId: updatedTrade.requestorItemId,
                //     requesteeId: updatedTrade.requesteeId,
                //     requesteeItemId: updatedTrade.requesteeItemId,
                //     status: updatedTrade.status,
                // },
                trade: updatedTrade
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating trade:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params} :  { params: Promise<{ id: string }> }
){
    try {
        const id = (await params).id;
        console.log('id:', id)//ID
        if(!id){
            return NextResponse.json(
                { error: "no id" },
                { status: 400 }
            );
        }

        const tradeObjectId = new ObjectId(id);
        const trade = await TradeModel.findById(tradeObjectId);
        console.log(trade);


        const deleteTrade = await TradeModel.findOneAndDelete({
            _id: tradeObjectId,
        });

        if (!deleteTrade) {
            return NextResponse.json(
                { error: "trade not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "trade deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating trade:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}