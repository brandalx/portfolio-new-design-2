// lib/metadata-utils.ts
import { Metadata } from "next";

export type Project = {
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
};

export async function getProjectData(
  projectName: string,
  category: string,
  subcategory: string
): Promise<Project | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/cache/projects.json`, {
      // Don't use Next.js cache due to size limit, but allow HTTP caching
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status);
      return null;
    }

    const projects: Project[] = await res.json();

    return (
      projects.find(
        (p) =>
          p.name === projectName &&
          p.category === category &&
          p.subcategory === subcategory
      ) || null
    );
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

type MetadataConfig = {
  category: string;
  subcategory: string;
  categoryDisplay: string;
  baseUrl: string;
  keywords: string[];
};

export function generateProjectMetadata(
  project: Project,
  config: MetadataConfig,
  projectSlug: string
): Metadata {
  const projectTitle = project.title || project.description || project.name;
  const projectDescription =
    project.description ||
    project.title ||
    `${project.name} - ${config.categoryDisplay} by Brandon Nolan`;

  const keywords = [
    "Brandon Nolan",
    project.name,
    project.software || config.categoryDisplay,
    project.type || `${config.categoryDisplay} project`,
    "portfolio",
    ...config.keywords,
  ];

  if (project.client) keywords.push(project.client);

  return {
    metadataBase: new URL(config.baseUrl),
    title: `${projectTitle} | Brandon Nolan - ${config.categoryDisplay}`,
    description: projectDescription,
    keywords,
    openGraph: {
      title: `${projectTitle} | Brandon Nolan Portfolio`,
      description: projectDescription,
      url: `${config.baseUrl}/${config.category}/${config.subcategory}/${projectSlug}`,
      type: "website",
      locale: "en_CA",
      images: [
        {
          url: project.cover,
          alt: `${project.name} - Brandon Nolan ${config.categoryDisplay}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectTitle} | Brandon Nolan Portfolio`,
      description: projectDescription,
      site: "@brandalx",
      creator: "@brandalx",
      images: [
        {
          url: project.cover,
          alt: `${project.name} - Brandon Nolan ${config.categoryDisplay}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
