import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { checkRateLimit } from "@/lib/rateLimit";

// ISR: Cache for 1 hour, revalidated on-demand when images are uploaded/deleted
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

    // Use Admin API instead of Search API (much cheaper)
    const folder = process.env.CLOUDINARY_FOLDER || "portfolio";
    
    const resourcesResponse = await cloudinary.api.resources({
      type: "upload",
      prefix: `${folder}/`,
      max_results: limit,
      next_cursor: cursor || undefined,
      context: true, // Explicitly request context data
    });

    let resources = resourcesResponse.resources || [];

    // Filter by category client-side (Admin API doesn't support context filtering)
    if (category && category !== "all") {
      resources = resources.filter(
        (r: any) => {
          const ctx = r.context?.custom || r.context;
          return ctx?.category === category;
        }
      );
    }

    const galleryItems = resources.map((resource: any) => {
      const ctx = resource.context?.custom || resource.context || {};

      // Grid thumbnail: 16:9 crop for consistent layout (cached 1 hour)
      const gridUrl = resource.secure_url.replace(
        /\/upload\/(v\d+\/)?/,
        '/upload/w_640,h_360,c_fill,q_auto:good,f_auto/$1'
      );

      // Lightbox: Original aspect ratio, max 800px width
      const lightboxUrl = resource.secure_url.replace(
        /\/upload\/(v\d+\/)?/,
        '/upload/w_800,q_auto:good,f_auto/$1'
      );

      return {
        src: gridUrl,
        lightboxSrc: lightboxUrl,
        alt: ctx.alt || resource.alt || resource.public_id,
        label: ctx.caption || "Portfolio Piece",
        category: ctx.category || "all",
        public_id: resource.public_id,
        width: resource.width,
        height: resource.height,
      };
    });

    return NextResponse.json({
      resources: galleryItems,
      next_cursor: resourcesResponse.next_cursor || null,
    }, {
      headers: {
        // Cache API response: 1 hour with 2 hour stale backup
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        // Browser cache for images: 1 year (Cloudinary URLs are immutable)
        "x-image-cache": "max-age=31536000, public",
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
