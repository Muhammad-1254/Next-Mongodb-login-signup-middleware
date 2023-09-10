import { NextResponse,NextRequest } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";




connect()

export const POST = async (request:NextRequest)=>{

    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        console.log("reqBody: ",reqBody);

        // check if user already exist 
       const user = await User.findOne({email})
       console.log("user ", user)

       if(user){
        console.log("user already exist")
        return NextResponse.json({
            message:'User Already exist',
        success:false,

        },{status:400})
       }
        

       //hash password
       const salt = await bcryptjs.genSalt(10)
       const hashPassword = await bcryptjs.hash(password,salt)
console.log("hashpassword ",hashPassword)

     const newUser = new User({
        username,
        email,
        password:hashPassword
       })
       console.log("newUser ",newUser)

       const savedUser = await newUser.save()
        console.log("saveUser: ",savedUser);

    //    send email verification 
     const mail = await sendEmail({email, emailType:'VERIFY',
    userId:savedUser._id}) 
    // console.log("mail :",mail);

       return NextResponse.json({
        message:"User created successfully",
        success:true,
        savedUser:savedUser
       })
       
        
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{status:500})
    }

}