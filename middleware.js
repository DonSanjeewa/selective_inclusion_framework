// middleware.js
export function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Block access if the request is coming from .vercel.app domain
  if (hostname.includes('.vercel.app')) {
    return new Response('Forbidden', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Allow all other requests to proceed
  return;
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
