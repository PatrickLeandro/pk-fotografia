import {NextResponse} from 'next/server';
export function middleware(){const response=NextResponse.next();response.headers.set('X-Content-Type-Options','nosniff');response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');response.headers.set('Cache-Control','private, no-store');return response}
export const config={matcher:['/','/admin/:path*','/galeria/:path*','/api/:path*']};
