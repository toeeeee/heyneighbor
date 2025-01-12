export type UserType = {
    _id: string,
    name: string,
    votes: number,
};


export type ItemType = {
    _id: Obje,
    userId: string,
    itemName: string,
    itemDescription: string,
};

export const statusEnumValues = ["pending", "completed", "reject"] as const;
export type StatusEnum = typeof statusEnumValues[number];

export type TradeType = {
    _id: string,
    requestorId: string,
    requestorItemId: string,
    requesteeId: string,
    requesteeItemId: string, 
    status: StatusEnum,
};
