import { Pool, PoolClient } from "pg";
import { hashPassword } from "./hash";
import { User, Vendor } from "@/types/db";
import { APIResponse, ErrorResponse } from "@/types/api";

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

export async function getClient(): Promise<PoolClient | ErrorResponse> {
  let client;
  try {
    client = await pool.connect();
  } catch (error) {
    console.error({ "db.js connection error : ": error });
    return { message: "pool connection failed" };
  }
  return client;
}

// Helper function to verify admin credentials
export async function verifyUser(
  client: any,
  email: string,
  password: string,
  role: "Admin" | "User" | "Vendor"
) {
  password = hashPassword(password, process.env.HASH_KEY as string);
  try {
    const query = `SELECT * FROM Users WHERE Email = $1 AND Password = $2 AND Role = '${role}'`;
    const result = await client.query(query, [email, password]);

    if (result.rows.length === 0) {
      return {
        type: "error",
        message: `Invalid email or password, or user is not an '${role}'.`,
      };
    }

    // Admin found
    return {
      type: "success",
      message: "Login successful.",
      user_id: result.rows[0].user_id,
      // result
    };
  } catch (error) {
    console.error(`Error verifying '${role}' :`, error);
    return {
      type: "error",
      message: "An error occurred during login.",
    };
  }
}

export async function createUser(
  client: any,
  { email, name, password, role, membership = false }: User
) {
  try {
    // Hash the password
    const hashedPassword = hashPassword(
      password,
      process.env.HASH_KEY as string
    );

    // Insert user into the database
    const query = `
      INSERT INTO Users (Email, Password, Role, Membership, Name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING user_id
    `;
    const values = [email, hashedPassword, role, membership, name];

    const result = await client.query(query, values);
    const { user_id } = result.rows[0];

    return {
      type: "success",
      message: "User created successfully",
      user_id: user_id,
    };
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { type: "error", message: error.message };
  }
}

export async function createVendor(
  client: PoolClient,
  { email, name, password, job }: Vendor
) {
  try {
    await client.query("BEGIN"); // Start transaction

    // Hash the password
    const hashedPassword = hashPassword(
      password,
      process.env.HASH_KEY as string
    );

    // Insert into Users table
    const userQuery = `
      INSERT INTO Users (Email, Password, Role, Membership, Name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING User_ID
    `;
    const userValues = [email, hashedPassword, "Vendor", false, name];
    const userResult = await client.query(userQuery, userValues);
    const user_id = userResult.rows[0].user_id;

    // Insert into Vendors table
    const vendorQuery = `
      INSERT INTO Vendors (User_ID, job)
      VALUES ($1, $2)
      RETURNING Vendor_ID
    `;
    const vendorValues = [user_id, job];
    const vendorResult = await client.query(vendorQuery, vendorValues);
    const vendor_id = vendorResult.rows[0].vendor_id;

    await client.query("COMMIT"); // Commit transaction

    return {
      type: "success",
      message: "Vendor created successfully",
      vendor_id: vendor_id,
    };
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback transaction on error
    console.error("Error creating vendor:", error);
    return { type: "error", message: (error as Error).message };
  }
}
