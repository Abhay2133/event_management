import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Clear the auth_token cookie
  const response = NextResponse.redirect(new URL("/", req.url));

  // Expire the 'auth_token' cookie by setting it to an empty string with an immediate expiration time
  response.cookies.set({
    name: 'auth_token',
    value: '',
    expires: new Date(0), // Immediate expiration
    path: '/',  // Apply to the entire site
  });

  return response;
}
