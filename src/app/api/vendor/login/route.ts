import { NextResponse } from "next/server";
import { getClient, verifyUser } from "@/lib/db";
import { serialize } from "cookie";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  let client;
  try {
    client = await getClient();
    const { email, password } = await req.json();

    // Verify admin login credentials
    const result = await verifyUser(client, email, password, "Vendor");

    if (result.type === "error") {
      return NextResponse.json({ error: result.message }, { status: 401 });
    }

    const payload = { user_id: result.user_id , role : 'Vendor'};
    const token = await signToken(payload);

    const cookie = serialize("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict",
      path: "/",
      maxAge: parseInt(process.env.JWT_EXPIRY as string), // 1 hour
    });

    // If success, return the success message
    let response = NextResponse.json(
      { message: result.message, payload, result },
      { status: 200 }
    );
    response.headers.set("Set-Cookie", cookie);

    return response;
  } catch (error) {
    console.error("Error processing Vendor login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await (client as any).release();
  }
}
