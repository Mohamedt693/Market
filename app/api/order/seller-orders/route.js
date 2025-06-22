import { getAuth } from "@clerk/nextjs/server";
import Order from '@/models/Order';
import connectDB from '@/config/db'
import { NextResponse } from "next/server";
import authSeller from '@/lib/authSeller'

export async function GET(request) {
    try {
        const {userId} = getAuth(request)
        const iseSeller = await authSeller(userId)
        if(!iseSeller){
            return NextResponse.json({success: false, message: "Not Authorized"})
        }
        await connectDB()

        const orders = await Order.find({userId}).populate('address items.product')
        return NextResponse.json({success: true, orders})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
        
    }
}
