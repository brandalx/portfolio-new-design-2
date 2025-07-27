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

export async function POST() {
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
                  cover: img.secure_url, // Default to first image
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

            // Store image with metadata for later use
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

      // Finalize projects by applying metadata from the image with context
      for (const projectName in projectsMap) {
        const { project, metadataImage } = projectsMap[projectName];
        if (metadataImage) {
          project.cover = metadataImage.img.secure_url; // Set cover to image with metadata
          project.title = metadataImage.context.title || undefined;
          project.description = metadataImage.context.description || undefined;
          project.link = metadataImage.context.link || undefined;
          project.description2 =
            metadataImage.context.description2 || undefined;
          project.description3 =
            metadataImage.context.description3 || undefined;
          project.description4 =
            metadataImage.context.description4 || undefined;
          project.client = metadataImage.context.client || undefined;
          project.date = metadataImage.context.date || undefined;
          project.software = metadataImage.context.software || undefined;
          project.type = metadataImage.context.type || undefined;
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
