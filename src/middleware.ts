import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.redirect(new URL("/movies", request.nextUrl));
  }
}

export const config = {
  matcher: ["/"],
};
