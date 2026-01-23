import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const loginRoute = "/login";
    const allowRoutes = [loginRoute, "/signup"];
    const dashboardRoute = "/app";
    const isAuthenticated = request.cookies.get("access_token")?.value;

    if (!isAuthenticated && !allowRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(loginRoute, request.url));
    }

    if (isAuthenticated && allowRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL(dashboardRoute, request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$|.*\\.svg$).*)",
    ],
};
