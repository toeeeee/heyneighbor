import { models, model, Schema } from "mongoose";
// import { randomUUID as uuidv4 } from "crypto";

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // password: {
    //     type: String, 
    //     required: true,
    //     unique: false,
    //     default: "123abc"
    // },
    votes: {
        type: Number,
        required: true,
        default: 0,
    },
    image_url: {
        type: String,
        required: true,
        default: 'https://images.freeimages.com/image/thumbs/925/waterfowl-glide-illustration-png-5696314.png'
    }
});

export const UserModel = models.User || model("User", UserSchema);

const ItemSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});


export const ItemModel = models.Item || model("Item", ItemSchema);

export const statusEnum = {
    values: ["pending", "completed", "reject"],
    message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
};

const TradeSchema: Schema = new Schema({
    requestorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    requestorItemId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Item",
    },
    requesteeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    requesteeItemId: {
        type: Schema.Types.ObjectId,
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

export const TradeModel = models.Trade || model("Trade", TradeSchema);



// future fields to consider for items

// Category: To categorize the item (e.g., Electronics, Furniture, etc.).
// Condition: To describe the condition of the item (e.g., New, Like New, Used, etc.).
// Images: To store URLs of images of the item.
// Location: To specify the location of the item.
// Date Posted: To track when the item was posted.
// Trade Preferences: To specify what the user is looking to trade for.
// Status: To indicate if the item is available, pending, or traded.