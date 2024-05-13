import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(request: NextRequest) {
  const session = await getSession({
    req: {
      ...request,
      headers: {
        ...Object.fromEntries(request.headers),
      },
    },
  });

  const path = request.nextUrl.pathname;

  if (!session && !path.includes("/api/auth/")) {
    return NextResponse.redirect("http://localhost:3000/api/auth/signin");
  }
}
