import { NextRequest, NextResponse } from 'next/server';

const BLOCKCHAIN_API_URL = process.env.BLOCKCHAIN_API_URL!;
const BLOCKCHAIN_DEV_API_URL = process.env.BLOCKCHAIN_DEV_API_URL!;

const BLOCKCHAIN_DEVICE_ID = process.env.BLOCKCHAIN_DEVICE_ID!;
const BLOCKCHAIN_SESSION_ID = process.env.BLOCKCHAIN_SESSION_ID!;
const BLOCKCHAIN_LANGUAGE = process.env.BLOCKCHAIN_LANGUAGE!;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authorization token is missing' },
        { status: 401 }
      );
    }

    const headers: Record<string, string> = {
      'X-Device-ID': BLOCKCHAIN_DEVICE_ID,
      'X-Session-ID': BLOCKCHAIN_SESSION_ID,
      'Accept-Language': BLOCKCHAIN_LANGUAGE,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const mode = request.headers.get('x-mode');
    const url =
      mode === 'development' ? BLOCKCHAIN_DEV_API_URL : BLOCKCHAIN_API_URL;
    const res = await fetch(`${url}/blockchain/stats`, {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Blockchain API request failed' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
