import { ObjectId } from "mongodb";

export type UserType = {
    _id: ObjectId,
    name: string,
    votes: number,
    image_url: string,
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
    requestorId: UserType,
    requestorItemId: ItemType,
    requesteeId: UserType,
    requesteeItemId: ItemType, 
    status: StatusEnum,
};
