import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rateLimit";

// Revalidate gallery every 5 minutes (300 seconds)
// This ensures fresh data without manual cache invalidation
export const revalidate = 300;

export async function GET(request: Request) {
  try {
    // Rate Limit: 15 requests per 60 seconds
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const ratelimit = checkRateLimit(ip, 15, 60000);

    if (!ratelimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
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

    // Get pagination and filter parameters
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get("next_cursor");
    const category = searchParams.get("category");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);

    // Search for resources in the portfolio folder
    const folder = process.env.CLOUDINARY_FOLDER || "portfolio";
    // Search by folder path - include subfolders with *
    let expression = `folder:"${folder}" OR folder:"${folder}/*"`;

    if (category && category !== "all") {
      expression += ` AND context.category="${category}"`;
    }

    let query = cloudinary.search
      .expression(expression)
      .sort_by("created_at", "desc")
      .max_results(limit)
      .with_field("context");

    if (cursor) {
      query = query.next_cursor(cursor);
    }

    const result = await query.execute();
    const { resources, next_cursor } = result;

    const galleryItems = resources.map((resource: any) => ({
      src: resource.secure_url,
      alt: resource.context?.alt || resource.public_id,
      label: resource.context?.caption || "Portfolio Piece",
      category: resource.context?.category || "all",
      public_id: resource.public_id,
      width: resource.width,
      height: resource.height,
    }));

    return NextResponse.json({
      resources: galleryItems,
      next_cursor: next_cursor || null,
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 },
    );
  }
}
