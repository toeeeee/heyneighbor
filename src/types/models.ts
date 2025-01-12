import { ObjectId } from "mongodb";

export type UserType = {
    _id: ObjectId,
    name: string,
    votes: number,
};


export type ItemType = {
    _id: ObjectId,
    userId: string,
    itemName: string,
    itemDescription: string,
};

export const statusEnumValues = ["pending", "completed", "reject"] as const;
export type StatusEnum = typeof statusEnumValues[number];

export type TradeType = {
    _id: ObjectId,
    requestorId: string,
    requestorItemId: string,
    requesteeId: string,
    requesteeItemId: string, 
    status: StatusEnum,
};
