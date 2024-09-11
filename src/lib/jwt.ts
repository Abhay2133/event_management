// lib/jwtUtils.ts

import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function signToken(payload: object) {
  const jwt = await new SignJWT(payload as JWTPayload) // details to  encode in the token
   .setProtectedHeader({
    alg: 'HS256'
   }) // algorithm
   .setIssuedAt()
   .setExpirationTime(`${process.env.JWT_EXPIRY}s`) // token expiration time, e.g., "1 day"
   .sign(SECRET_KEY);
  return jwt;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
