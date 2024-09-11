// import { hashPassword } from "@/lib/hash";
import * as dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

export function hashPassword(password: string, hashKey: string): string {
  // const hashKey = process.env.HASH_KEY; // Ensure the HASH_KEY is defined in your .env file

  if (!hashKey) {
    throw new Error("HASH_KEY is not defined in environment variables.");
  }

  // Create the hash using sha256 or any other algorithm you prefer
  const hash = crypto
    .createHmac("sha256", hashKey)
    .update(password)
    .digest("hex"); // Output format can be 'hex', 'base64', etc.

  return hash;
}

let password = "admin@root";
let hash = hashPassword(password, process.env.HASH_KEY as string);

console.log({ hash });
