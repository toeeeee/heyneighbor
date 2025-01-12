import {NextRequest, NextResponse} from 'next/server';
import { ObjectId } from "mongodb";
import { connectMongo } from '@/utils/mongodb';
import { UserModel } from '@/models/models';


export async function GET(
        req: NextRequest,
        { params }: { params: Promise<{ id: string }> }
    ) 

{
    try {
        const id = (await params).id;
        const objId = new ObjectId(id);

        await connectMongo();   
        const user = await UserModel.findById(objId);
        console.log(user);
        return NextResponse.json({user});
    }
    catch {
        console.error("Trouble fetching user");
        return NextResponse.json( {error: "bruh"}, {status: 500} );
    }
}

// TODO: this is for updating votes, but its exploitable clientside bc u could send infinite votes w/o vote 
// tracking for each user
export async function POST(req: NextRequest,
                          {params} : { params: Promise<{id: string}>  }
                          ) {
    try {
        const body = await req.json();
        if (!(typeof body === "object" &&
            typeof body.vote === "boolean")) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const objId = new ObjectId((await params).id);
        
        await connectMongo();

        if (body.vote) {
            const updatedUser = await UserModel.findOneAndUpdate({_id: objId}, {$inc: {votes: 1}});   
            console.log(updatedUser);
            return NextResponse.json( {updatedUser} );
        }
        else {
            const updatedUser = await UserModel.findOneAndUpdate({_id: objId}, {$inc: {votes: -1}});   
            return NextResponse.json( {updatedUser} );
        }
        return NextResponse.json( {error: "peepeepoopoo"}, {status: 500})
    }
    catch (error) {
        console.error("Trouble updating user profile")
        console.log(error);
        return NextResponse.json( {error: "RAAAH"}, {status: 500})
    }
}