import {NextRequest, NextResponse} from 'next/server';
import { connectMongo } from '@/utils/mongodb';
import { UserModel } from '@/models/models';

export async function GET(
        req: NextRequest,
        { params }: { params: { id: string } }
    ) 
{
    try {
        await connectMongo();   

        if (!params.id) {
            return NextResponse.json(
                { error: "account ID is required" },
                { status: 400 }
            );
        }

        const user = await UserModel.find({id: params.id});
        console.log(user);
        return NextResponse.json({user});
    }
    catch {
        console.error("Trouble fetching user");
        return NextResponse.json( {error: "bruh"}, {status: 500} );
    }
}