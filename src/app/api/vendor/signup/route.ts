import { createUser, createVendor, getClient } from "@/lib/db";
import { User } from "@/types/db";
import { NextRequest, NextResponse } from "next/server";
import { PoolClient } from "pg";

export async function POST(req: NextRequest) {
  let client;
  client = (await getClient()) as PoolClient;
  try {
    const { email, password, name, job } = await req.json();

    // Validate input
    if (!email || !password || !name || !job) {
      return NextResponse.json(
        { type: "error", message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call the helper function to create the vendor
    const result = await createVendor(client, { email, name, password , job});

    if (result.type === "error") {
      return NextResponse.json(result, { status: 400 });
    }

    // Respond with success
    return NextResponse.json(result, { status: 201 });
  } catch (error:any) {
    console.error("Error handling vendor signup request:", error);
    return NextResponse.json(
      { type: "error", message: error.message },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
