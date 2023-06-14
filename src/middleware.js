import { NextResponse } from 'next/server';
var routePreventToken = ['/profile','/profileDetail','/feedback','/customerService'];
export function middleware(req) {
    const { pathname } =  req.nextUrl;
    const absoluteUrl = new URL("/", req.url).toString();
    if (routePreventToken.some((prefix) => pathname.startsWith(prefix))) {
        if(!req.cookies.has('token')) {
            return NextResponse.redirect(absoluteUrl+'login');
        }
    }else if((pathname === '/login' || pathname === '/register' || pathname === '/forgotPassword') && req.cookies.has('token')) {
        if(req.cookies.has('token')) {
            return NextResponse.redirect(absoluteUrl+'home');
        }
    } 
    return NextResponse.next(); 
}
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|favicon.ico).*)',
    ],
}