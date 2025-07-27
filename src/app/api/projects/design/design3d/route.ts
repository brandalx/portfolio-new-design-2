import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"
    );
    if (!res.ok) throw new Error("Failed to fetch cached projects");
    const projects = await res.json();
    const portraitProjects = projects.filter(
      (project: any) =>
        project.category === "design" && project.subcategory === "design3d"
    );
    return NextResponse.json(portraitProjects);
  } catch (error: any) {
    console.error("Error reading cached projects:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
