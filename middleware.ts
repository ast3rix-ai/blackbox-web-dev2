import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Get country from Vercel's geolocation header
    // This header is automatically provided by Vercel Edge Network
    const country = request.headers.get('x-vercel-ip-country') || 'XX';

    // Check if user already has a saved language preference cookie
    const hasLanguagePref = request.cookies.get('has-language-pref');

    // If no language preference saved, redirect with geo param on first load
    const url = request.nextUrl.clone();

    // Only add geo param if not already present and no saved preference
    if (!hasLanguagePref && !url.searchParams.has('geo')) {
        url.searchParams.set('geo', country);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Run middleware on all pages
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
};
