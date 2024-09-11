import { verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const {role} = await req.json();
  const cookies = req.cookies;
  const token = cookies.get('auth_token')?.value || "";
  let payload
  try{
    payload = await verifyToken(token as string) as any;
    console.log({payload})
    if(payload.role !== role){
      console.error("verification failed : role doesn't matches");
      return NextResponse.json({type:"error", message : "role doesn't matches"});
    }
    return NextResponse.json({type:"success", message:"user is verified for "+role})
  } catch(e:any){
    console.error("verification error : ", e);
    return NextResponse.json({type:"error", message:"verificatoin failed : "+e.message}, {status: 408})
  }
}