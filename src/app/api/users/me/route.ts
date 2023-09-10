import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from '@/dbConfig/dbConfig'

connect();

export const GET = async (request:NextRequest)=>{


    try {

        const userData = await getDataFromToken(request);
        const user = await User.findOne({ id : userData._id}).select("-password");
        // console.log("from decode to userData route: ",userData);
        // console.log("from decode to user route: ",user);

        
        return NextResponse.json({
            message:'User found',
            data:user
        },{status:200})

        

    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:400})
    }
}
