import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Rate Limit: 10 login attempts per 60 seconds
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = checkRateLimit(ip, 10, 60000);

    if (!ratelimit.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(
              (ratelimit.reset - Date.now()) / 1000,
            ).toString(),
          },
        },
      );
    }

    const { secret } = await request.json();

    // Verify against server environment variable
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Create HTTP-only cookie session (1 hour expiry)
    const response = NextResponse.json({ success: true });

    response.cookies.set("studio_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Studio verify failed:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    // Check if user has valid auth cookie
    const authCookie = request.headers.get("cookie")?.includes("studio_auth=authenticated");

    if (!authCookie) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 },
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error("Studio auth check failed:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 },
    );
  }
}
