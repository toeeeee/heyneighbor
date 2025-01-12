// POST api/trade

import { TradeModel, UserModel } from "@/models/models";
import { connectMongo } from "@/utils/mongodb";
// import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type TradeRequestBody = {
    requestorId: string;
    requestorItemId: string;
    requesteeId: string;
    requesteeItemId: string;
    tradeStatus: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateRequestBody(body: any): body is TradeRequestBody {
    return (
        typeof body === "object" &&
        typeof body.requestorId === "string" &&
        typeof body.requestorItemId === "string" &&
        typeof body.requesteeId === "string" &&
        typeof body.requesteeItemId === "string" &&
        typeof body.tradeStatus === "string"
    );
}

await connectMongo();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        if (!validateRequestBody(body)) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }
        const {requestorId, requestorItemId, requesteeId, requesteeItemId, tradeStatus} = body;
        // const requestorIdObjectId = new ObjectId(requestorId);
        const requestorUser = UserModel.findById(requestorId);
        if (!requestorUser) {
            return NextResponse.json(
                { error: "requestorUser not found" },
                { status: 404 }
            );
        }

        // const requesteeIdObjectId = new ObjectId(requesteeId);
        const requesteeUser = UserModel.findById(requesteeId);
        if (!requesteeUser) {
            return NextResponse.json(
                { error: "requsteeUser not found" },
                { status: 404 }
            );
        }

        const newTrade = await TradeModel.create({
            requestorId, requestorItemId, requesteeId, requesteeItemId, tradeStatus
        });

        return NextResponse.json(
            {
                message: "trade created successfully",
                // trade: {
                //     id: newTrade._id,
                //     requestorId: newTrade.requestorId,
                //     requestorItemId: newTrade.requestorItemId,
                //     requesteeId: newTrade.requesteeId,
                //     requesteeItemId: newTrade.requesteeItemId,
                // },
                trade: newTrade
            },
            { status: 201 }
        );
    }catch(error){
        console.error("Error creating item:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};