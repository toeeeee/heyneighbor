import { UUID } from "mongodb";
import { models, model, Schema } from "mongoose";
import { randomUUID as uuidv4 } from 'crypto';

const UserSchema: Schema = new Schema({
    id: {
        type: UUID,
        default: () => uuidv4(),
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0,
    },
});

export const UserModel = models.User || model("User", UserSchema);


const ItemSchema: Schema = new Schema({
    id: {
        type: UUID,
        default: uuidv4(),
        unique: true,
    },
    userId: { 
        type: UUID, 
        ref: 'User' 
    },
    itemName: {
        type: String, 
        required: true,
    },
    itemDescription: {
        type: String, 
        required: true,
    }, 
});

export const ItemModel = models.Item || model("Item", ItemSchema);

const TradeSchema: Schema = new Schema({
    id: {
        type: UUID,
        default: () => uuidv4(),
        unique: true,
    },
    requestorId: {
        type: UUID,
        required: true,
        ref: 'User'
    },
    requestorItemId: {
        type: UUID,
        required: true,
        ref: 'Item'
    },
    requesteeId: {
        type: UUID,
        required: true,
        ref: 'User'
    },
    requesteeItemId: {
        type: UUID,
        required: true,
        ref: 'Item'
    },
});

export const TradeModel = models.Trade || model("Trade", TradeSchema);