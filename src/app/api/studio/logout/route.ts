import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    // Clear the auth cookie
    response.cookies.set("studio_auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Immediately expire
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Studio logout failed:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 },
    );
  }
}
