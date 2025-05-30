import { NextResponse } from 'next/server';

const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL!;
const BLOCKCHAIN_CLIENT_ID = process.env.BLOCKCHAIN_CLIENT_ID!;
const BLOCKCHAIN_CLIENT_SECRET = process.env.BLOCKCHAIN_CLIENT_SECRET!;
const BLOCKCHAIN_DEVICE_ID = process.env.BLOCKCHAIN_DEVICE_ID!;
const BLOCKCHAIN_SESSION_ID = process.env.BLOCKCHAIN_SESSION_ID!;
const BLOCKCHAIN_LANGUAGE = process.env.BLOCKCHAIN_LANGUAGE!;

export async function POST() {
  try {
    const headers: Record<string, string> = {
      'X-Device-ID': BLOCKCHAIN_DEVICE_ID,
      'X-Session-ID': BLOCKCHAIN_SESSION_ID,
      'Accept-Language': BLOCKCHAIN_LANGUAGE,
      'Content-Type': 'application/json',
    };
    const res = await fetch(`${BLOCKCHAIN_API_URL}/auth/client-credential`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        clientId: BLOCKCHAIN_CLIENT_ID,
        clientSecret: BLOCKCHAIN_CLIENT_SECRET,
      }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to get token' },
        { status: 500 }
      );
    }
    const data = await res.json();

    if (!data.token) {
      return NextResponse.json(
        { error: 'Invalid response format' },
        { status: 500 }
      );
    }
    return NextResponse.json({ token: data.token });
  } catch (err) {
    console.error('Token creation error:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
