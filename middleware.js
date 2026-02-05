// middleware.js
export function middleware(request) {
  // Get the hostname from the request headers (more reliable for Vercel Edge Middleware)
  const hostname = request.headers.get('host') || '';
  
  // Block access if the request is coming from .vercel.app domain
  if (hostname && hostname.includes('.vercel.app')) {
    return new Response('Forbidden', {
      status: 403,
      statusText: 'Forbidden',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  
  // Allow all other requests to proceed
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
