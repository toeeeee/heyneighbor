import { connectMongo } from "@/utils/mongodb.js";
import "./envConfig.ts";
import { ItemModel } from "@/models/models.js";

// (async () => {
//     const MONGO_URI = process.env.MONGO_URI;
//     if(!MONGO_URI){
//         throw new Error('no MONGO_URI');
//     }
//     // connection to mongodb
//     console.log('Connecting to MongoDB...');
//     connect(MONGO_URI);

//     console.log('Connection established:');

//     // create test user
//     const joseUser = new UserModel({ name: "ally" });
//     await joseUser.save();

//     // find all users
//     const user = await UserModel.find();
//     console.log(user)
// })();

// // or

// await Tank.create({ size: 'small' });

// // or, for inserting large batches of documents
// await Tank.insertMany([{ size: 'small' }]);

// TESTING API
// (async () => {
//     const itemApi = "http://localhost:3000/api/item/"; //JOSE ACCT
//     const response = await fetch(itemApi, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             userId: "6783198219c767879147868f",
//             itemName: "roseshearts",
//             itemDescription: "the rosey of heartsy",
//         }),
//     });
//     const newUser = await response.json();
//     console.log("newUser:", newUser); //TESTING

    // await connectMongo();
    // db.items.getIndexes()


// })();

// change item
// (async () => {
//     const itemApi = "http://localhost:3000/api/item/6783199895d4054423e79b8d"; //JOSE ACCT
//     const response = await fetch(itemApi, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         // body: JSON.stringify({
//         //     // userId: '8255715d-61f5-4b9b-bec7-e4ae2860b6e3',
//         //     // itemName: 'cheerios',
//         //     itemDescription: "grainy oaks",
//         // }),
//     });
//     const newUser = await response.json();
//     console.log("newUser:", newUser); //TESTING
// })();

// TRADE api routes
// typeof body.requestorId === "string" &&
// typeof body.requestorProductId === "string" &&
// typeof body.requesteeId === "string" &&
// typeof body.requesteeProductId === "string"

(async () => {
    const itemApi = "http://localhost:3000/api/trade/678343ebc139c247927b1822"; //JOSE ACCT
    const response = await fetch(itemApi, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //     // requestorId:'6783198219c767879147868f',
        //     // requestorItemId: '6783420b2a0838fc28131823',
        //     // requesteeId: '6783189ab0d8193ea042be3b',
        //     // requesteeItemId: '678321327fd20220ab23f021',
        //     status: 'completed'
        // }),
    });
    const newUser = await response.json();
    console.log("newUser:", newUser); //TESTING
})();
