import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/clerk-webhook',
    '/api/drive-activity/notification',
    '/api/payment/success',
]);
const isIgnoredRoute = createRouteMatcher([
    '/api/auth/callback/discord',
    '/api/auth/callback/notion',
    '/api/auth/callback/slack',
    '/api/flow',
    '/api/cron/wait',
])
export default clerkMiddleware((auth, request) => {
  if(!isPublicRoute(request) && !isIgnoredRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}