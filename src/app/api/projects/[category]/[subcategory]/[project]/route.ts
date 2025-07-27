import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: Request,
  {
    params,
  }: { params: { category: string; subcategory: string; project: string } }
) {
  const { category, subcategory, project } = params;
  const folder = `${category}/${subcategory}/${project}`;
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || undefined; // Get next_cursor for pagination
  const limit = parseInt(searchParams.get("limit") || "50"); // Default to 50 images per request

  try {
    const result = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        expression: `folder=${folder}`,
        sort_by: [{ created_at: "asc" }],
        max_results: limit,
        next_cursor: cursor, // Support pagination
        with_field: ["context"],
      },
      {
        auth: {
          username: process.env.CLOUDINARY_API_KEY!,
          password: process.env.CLOUDINARY_API_SECRET!,
        },
      }
    );

    return NextResponse.json({
      resources: result.data.resources,
      next_cursor: result.data.next_cursor, // Return next_cursor for pagination
    });
  } catch (err: any) {
    console.error(
      "Cloudinary fetch failed:",
      err.response?.data || err.message
    );
    return NextResponse.json(
      { error: "Cloudinary fetch failed" },
      { status: 500 }
    );
  }
}
