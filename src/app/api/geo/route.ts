import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Get country from Vercel's geolocation header
    // This header is automatically provided by Vercel Edge Network
    const country = request.headers.get('x-vercel-ip-country') || 'XX';

    return NextResponse.json({ country });
}
