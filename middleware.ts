import { withMiddlewareAuth } from "@supabase/auth-helpers-nextjs";

export const middleware = withMiddlewareAuth({
  redirectTo: "/auth/login",
});

export const config = {
  matcher: ["/admin/:path*", "/"],
};
