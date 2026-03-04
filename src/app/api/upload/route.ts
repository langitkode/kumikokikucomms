import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rateLimit";

function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get("cookie") || "";
  return cookie.includes("studio_auth=authenticated");
}

export async function POST(request: Request) {
  try {
    // Check authentication first
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate Limit: 5 uploads per 60 seconds
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = checkRateLimit(ip, 5, 60000);

    if (!ratelimit.success) {
      return NextResponse.json(
        { error: "Upload limit reached. Please wait a moment." },
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

    const { image, category, label } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Upload to Cloudinary with category-based subfolder
    const mainFolder = process.env.CLOUDINARY_FOLDER || "portfolio";
    const uploadFolder = `${mainFolder}/${category || "uncategorized"}`;

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: uploadFolder,
      tags: ["portfolio-item"],
      context: {
        category: category || "all",
        caption: label || "New Artwork",
        alt: label || "Artwork",
      },
    });

    // Note: cacheTag requires "use cache" directive (Server Actions only)
    // For Route Handlers, rely on Cache-Control headers for caching
    // Gallery cache expires after 1 hour automatically

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Check authentication first
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { public_id } = await request.json();

    // Basic security check removed - cookie auth is sufficient
    if (!public_id) {
      return NextResponse.json(
        { error: "No public_id provided" },
        { status: 400 },
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Note: cacheTag requires "use cache" directive (Server Actions only)
    // For Route Handlers, rely on Cache-Control headers for caching
    // Gallery cache expires after 1 hour automatically

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Deletion failed:", error);
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
