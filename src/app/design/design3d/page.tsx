"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  name: string;
  cover: string;
};

export default function PortraitsProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json"
        );
        if (!res.ok) throw new Error("Failed to fetch cached projects");
        const data = await res.json();
        const portraitProjects = data.filter(
          (project: Project) =>
            //@ts-expect-error - no error
            project.category === "design" &&
            //@ts-expect-error - no error
            project.subcategory === "design3d"
        );
        setProjects(portraitProjects);
      } catch (error) {
        console.error("Error fetching cached projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Architecture Photography Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.name}>
            <Link
              href={`/design/design3ds/${project.name}`}
              className="no-underline"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={project.cover}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
