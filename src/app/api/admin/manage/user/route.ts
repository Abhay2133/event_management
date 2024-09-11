import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {

  let payload;
  let cookies = req.cookies;
  let auth_token = (cookies.get("auth_token") as any)?.value
  try{
    payload = await verifyToken(auth_token as string);
    return NextResponse.json({payload});
  } catch(e){
    console.error({auth_token, e})
    return NextResponse.json({error:"Authentication failed"}, {status:408});
  }
}