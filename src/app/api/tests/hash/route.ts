import { hashPassword } from "@/lib/hash";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const {text} = await req.json();
  return NextResponse.json({hash: hashPassword(text, process.env.HASH_KEY as string)})
}