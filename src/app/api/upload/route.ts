import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
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

    const { image, category, label, adminSecret } = await request.json();

    // Basic security check
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const { public_id, adminSecret } = await request.json();

    // Basic security check
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!public_id) {
      return NextResponse.json(
        { error: "No public_id provided" },
        { status: 400 },
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Deletion failed:", error);
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
