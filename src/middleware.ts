import { NextRequest, NextResponse } from 'next/server';
import { isWhitelistedAddress } from './lib/helpers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ['/login', '/favicon.ico'];
  const isPublic =
    publicPaths.includes(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static');

  if (isPublic) return NextResponse.next();

  const address = request.cookies.get('wallet-address')?.value;
  const isConnected = request.cookies.get('is-connected')?.value === 'true';

  console.log('[Middleware]', {
    pathname,
    address,
    isConnected,
  });

  if (!isConnected || !address || !isWhitelistedAddress(address)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
