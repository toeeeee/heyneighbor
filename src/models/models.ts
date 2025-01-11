import { UUID } from "mongodb";
import { models, model, Schema } from "mongoose";
import { randomUUID as uuidv4 } from "crypto";

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
        ref: "User",
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
// future fields to consider
// Category: To categorize the item (e.g., Electronics, Furniture, etc.).
// Condition: To describe the condition of the item (e.g., New, Like New, Used, etc.).
// Images: To store URLs of images of the item.
// Location: To specify the location of the item.
// Date Posted: To track when the item was posted.
// Trade Preferences: To specify what the user is looking to trade for.
// Status: To indicate if the item is available, pending, or traded.

export const ItemModel = models.Item || model("Item", ItemSchema);

const statusEnum = {
    values: ["pending", "completed", "reject"],
    message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
};

const TradeSchema: Schema = new Schema({
    id: {
        type: UUID,
        default: () => uuidv4(),
        unique: true,
    },
    requestorId: {
        type: UUID,
        required: true,
        ref: "User",
    },
    requestorItemId: {
        type: UUID,
        required: true,
        ref: "Item",
    },
    requesteeId: {
        type: UUID,
        required: true,
        ref: "User",
    },
    requesteeItemId: {
        type: UUID,
        required: true,
        ref: "Item",
    },
    status: {
        type: String,
        enum: statusEnum,
        required: true,
        default: "pending",
    },
});

// const enum = {
//     values: ['opening', 'open', 'closing', 'closed'],
//     message: 'enum validator failed for path `{PATH}` with value `{VALUE}`'
//   }
//   const s = new Schema({ state: { type: String, enum: enum })

export const TradeModel = models.Trade || model("Trade", TradeSchema);
