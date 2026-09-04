// filepath: src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Renamed from middleware to proxy
export function proxy(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Only run this authentication on /admin routes
  if (url.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // In production, you would compare against process.env.ADMIN_PASSWORD
      // We hardcode 'admin' as the username for simplicity
      if (user === 'admin' && pwd === process.env.ADMIN_PASSWORD) {
        return NextResponse.next();
      }
    }
    url.pathname = '/api/auth';
    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
