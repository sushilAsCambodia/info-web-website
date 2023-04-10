import { NextResponse } from 'next/server';
var routePreventToken = ['/profile','/profileDetail','/announcement','/feedback','/customerService'];
export function middleware(req) {
    const { pathname } =  req.nextUrl;
    const absoluteUrl = new URL("/", req.url).toString();
    if(routePreventToken.includes(pathname) && !req.cookies.has('token')) {
        return NextResponse.redirect(absoluteUrl+'login')
    }else if((pathname === '/login' || pathname === '/register' || pathname === '/forgotPassword') && req.cookies.has('token')) {
        return NextResponse.redirect(absoluteUrl+'home')
    } 
    return NextResponse.next(); 
}