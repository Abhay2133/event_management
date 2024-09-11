import { createUser, getClient } from "@/lib/db";
import { User } from "@/types/db";
import { NextRequest, NextResponse } from "next/server";
import { Pool, PoolClient } from "pg";

export async function POST(req: NextRequest) {
  let client;
  try {
    client = await getClient() as PoolClient;
    const { email, password, name } = await req.json();

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { type: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call the helper function to create the user
    const result = await createUser(client, {
      email,
      name,
      password,
      role: "User",
    } as User);

    if (result.type === "error") {
      return NextResponse.json(result, { status: 400 });
    }

    // Respond with success
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error handling signup request:", error);
    return NextResponse.json(
      { type: "error", message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    if(client) (client as PoolClient).release();
  }
}
