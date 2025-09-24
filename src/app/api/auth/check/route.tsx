import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("sb-access-token");
    if(typeof token.value === 'string'){
        return NextResponse.json({ value: true});
    }else{
        return NextResponse.json({ value : false});
    }
    
}