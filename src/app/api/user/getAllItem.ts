import { MongoClient } from "mongodb";
import { ItemModel } from "../../../models/models"
import connect from "../../../utils/mongodb2"

const URI = process.env.MONGO_URI
if (!URI) { throw new Error("no .env URI defined!") };

export async function POST(request: Request) {
    await ItemModel.find({});
}
