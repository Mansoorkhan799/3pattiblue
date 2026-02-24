import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const preferredLang = request.cookies.get('preferred-language')?.value;
  const lang = preferredLang === 'ur' || pathname === '/ur' ? 'ur' : 'en';
  response.headers.set('x-initial-lang', lang);
  return response;
}
