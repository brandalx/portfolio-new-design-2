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
    // Use the Vercel Blob URL directly
    const blobUrl =
      process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json";

    console.log("Fetching from:", blobUrl);
    console.log("Looking for project:", { projectName, category, subcategory });

    const res = await fetch(blobUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "User-Agent": "Next.js Server",
      },
      // Add timeout and retry logic
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!res.ok) {
      console.error("Failed to fetch projects from blob:", {
        status: res.status,
        statusText: res.statusText,
        url: blobUrl,
      });
      return null;
    }

    const projects: Project[] = await res.json();
    console.log("Total projects loaded:", projects.length);

    // Log available projects for debugging
    const availableProjects = projects
      .filter((p) => p.category === category && p.subcategory === subcategory)
      .map((p) => p.name);
    console.log(
      `Available projects in ${category}/${subcategory}:`,
      availableProjects
    );

    const project = projects.find(
      (p) =>
        p.name === projectName &&
        p.category === category &&
        p.subcategory === subcategory
    );

    console.log("Project found:", project ? "Yes" : "No");
    if (project) {
      console.log("Found project details:", {
        name: project.name,
        category: project.category,
        subcategory: project.subcategory,
      });
    }

    return project || null;
  } catch (error) {
    console.error("Error fetching project data from blob:", error);

    // If the error is a timeout or network error, try once more
    if (
      error instanceof Error &&
      (error.name === "AbortError" || error.message.includes("fetch"))
    ) {
      console.log("Retrying fetch...");
      try {
        const blobUrl =
          process.env.NEXT_PUBLIC_PROJECTS_CACHE_URL || "/cache/projects.json";
        const res = await fetch(blobUrl, {
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (res.ok) {
          const projects: Project[] = await res.json();
          return (
            projects.find(
              (p) =>
                p.name === projectName &&
                p.category === category &&
                p.subcategory === subcategory
            ) || null
          );
        }
      } catch (retryError) {
        console.error("Retry also failed:", retryError);
      }
    }

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
  const projectTitle = project.description || project.title || project.name;
  const projectDescription =
    project.title ||
    project.description ||
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
