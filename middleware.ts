import { withMiddlewareAuth } from "@supabase/auth-helpers-nextjs";
import {NextRequest, NextResponse} from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }

  withMiddlewareAuth({
    redirectTo: "/auth/login",
  });
}

export const config = {
  matcher: ["/:path*"],
};