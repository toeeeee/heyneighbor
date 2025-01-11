import { UserModel } from "@/models/models";
import { connect } from "mongoose";
import "./envConfig.ts";


(async () => {
    const MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI){
        throw new Error('no MONGO_URI');
    }
    // connection to mongodb
    console.log('Connecting to MongoDB...');
    connect(MONGO_URI);

    console.log('Connection established:');

    // create test user
    // const joseUser = new UserModel({ name: "jose" });
    // await joseUser.save();


    // find all users
    const user = await UserModel.find();
    console.log(user)
})();

// // or

// await Tank.create({ size: 'small' });

// // or, for inserting large batches of documents
// await Tank.insertMany([{ size: 'small' }]);
