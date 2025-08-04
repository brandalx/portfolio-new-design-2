import { Metadata } from "next";
import SingleProject from "@/components/single-project/page";
import { getProjectData, generateProjectMetadata } from "@/lib/metadata-utils";

type Props = {
  params: Promise<{ project: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = await params;
  const decodedProjectName = decodeURIComponent(project);
  const projectData = await getProjectData(
    decodedProjectName,
    "photography",
    "architecture"
  );

  if (!projectData) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return generateProjectMetadata(
    projectData,
    {
      category: "photography",
      subcategory: "architecture",
      categoryDisplay: "Architecture Photography",
      baseUrl: "https://design.brandnolandev.com",
      keywords: [
        "architecture photography",
        "architectural photographer",
        "building photography",
        "photographer Canada",
      ],
    },
    project
  );
}

export default function ProjectPage() {
  return <SingleProject />;
}
