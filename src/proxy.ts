import { auth } from '@/auth';
import { NextRequest, NextResponse, ProxyConfig } from 'next/server';

export async function proxy(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);
  await auth(request as never);
  return NextResponse.next({ headers });
}

export const config: ProxyConfig = {
  matcher: ['/((?!api|static|favicon.ico|manifest.webmanifest).*)'],
};
