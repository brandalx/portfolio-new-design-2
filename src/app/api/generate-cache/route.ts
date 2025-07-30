//@ts-nocheck
import { NextResponse } from "next/server";
import axios from "axios";
import { put } from "@vercel/blob";

type Project = {
  name: string;
  cover: string;
  category: string;
  subcategory: string;
  title?: string;
  description?: string;
  link?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  client?: string;
  date?: string;
  software?: string;
  type?: string;
  images?: { secure_url: string; public_id: string; asset_id: string }[];
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token !== process.env.CACHE_GEN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const folderPaths = [
      "photography/portraits",
      "photography/architecture",
      "design/design2d",
      "design/design3d",
    ];

    const allProjects: Project[] = [];
    let totalApiCalls = 0;

    for (const folderPath of folderPaths) {
      const [category, subcategory] = folderPath.split("/");
      const projectsMap: Record<
        string,
        { project: Project; metadataImage?: any }
      > = {};
      let nextCursor: string | null = null;

      do {
        const result = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`,
          {
            expression: `folder:${folderPath}/*`,
            sort_by: [{ created_at: "asc" }],
            max_results: 500,
            with_field: ["context"],
            next_cursor: nextCursor,
          },
          {
            auth: {
              username: process.env.CLOUDINARY_API_KEY!,
              password: process.env.CLOUDINARY_API_SECRET!,
            },
          }
        );

        totalApiCalls++;
        const resources = result.data.resources;
        nextCursor = result.data.next_cursor;

        for (const img of resources) {
          const parts = img.asset_folder?.split("/") || [];
          if (parts.length === 3) {
            const projectName = parts[2];
            const context = img.context?.custom || {};

            if (!projectsMap[projectName]) {
              projectsMap[projectName] = {
                project: {
                  name: projectName,
                  cover: img.secure_url,
                  category,
                  subcategory,
                  title: undefined,
                  description: undefined,
                  link: undefined,
                  description2: undefined,
                  description3: undefined,
                  description4: undefined,
                  client: undefined,
                  date: undefined,
                  software: undefined,
                  type: undefined,
                  images: [],
                },
                metadataImage: null,
              };
            }

            if (Object.keys(context).length > 0) {
              projectsMap[projectName].metadataImage = { img, context };
            }

            projectsMap[projectName].project.images!.push({
              secure_url: img.secure_url,
              public_id: img.public_id,
              asset_id: img.asset_id,
            });
          }
        }

        if (nextCursor) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } while (nextCursor);

      for (const projectName in projectsMap) {
        const { project, metadataImage } = projectsMap[projectName];
        if (metadataImage) {
          const context = metadataImage.context;
          project.cover = metadataImage.img.secure_url;
          project.title = context.title || undefined;
          project.description = context.description || undefined;
          project.link = context.link || undefined;
          project.description2 = context.description2 || undefined;
          project.description3 = context.description3 || undefined;
          project.description4 = context.description4 || undefined;
          project.client = context.client || undefined;
          project.date = context.date || undefined;
          project.software = context.software || undefined;
          project.type = context.type || undefined;
        }
        allProjects.push(project);
      }
    }

    const blob = await put(
      "cache/projects.json",
      JSON.stringify(allProjects, null, 2),
      {
        access: "public",
        allowOverwrite: true,
      }
    );

    return NextResponse.json({
      message: "Cache generated successfully",
      url: blob.url,
      totalApiCalls,
      totalProjects: allProjects.length,
    });
  } catch (error: any) {
    console.error(
      "Error generating cache:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Failed to generate cache", details: error.message },
      { status: 500 }
    );
  }
}
