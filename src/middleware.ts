import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const preferredLang = request.cookies.get('preferred-language')?.value;

  // Redirect to match language preference - enables static rendering (bfcache)
  if (pathname === '/' && preferredLang === 'ur') {
    return NextResponse.redirect(new URL('/ur', request.url));
  }
  if (pathname === '/ur' && preferredLang === 'en') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
