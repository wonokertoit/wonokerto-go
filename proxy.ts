import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './app/lib/session';

export async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get('session')?.value;
  const session = await decrypt(sessionCookie);

  const { pathname } = req.nextUrl;

  // Public routes
  const publicRoutes = ['/', '/login', '/register', '/lupa-password', '/reset-password'];
  if (publicRoutes.includes(pathname)) {
    if (session?.userId) {
      if (session.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // If not authenticated and trying to access protected route
  if (!session?.userId) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (session.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
