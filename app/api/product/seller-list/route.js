import { getAuth } from "@clerk/nextjs/server";
import Product from "../../../../models/Product";
import { NextResponse } from "next/server";
import connectDB from '@/config/db';
import authSeller from '@/lib/authSeller'



export async function GET(request) {
    try {
        const {userId} = getAuth(request)
        const isSeller = await authSeller(userId)
        if(!isSeller){
            return NextResponse.json({success: false, message: "Not Autharized"})
        }
        await connectDB()
        const products = await Product.find({})
        return NextResponse.json({success: true, products})
    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}