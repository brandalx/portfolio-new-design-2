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
    "design",
    "design2d"
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
      category: "design",
      subcategory: "design2d",
      categoryDisplay: "2D Design",
      baseUrl: "https://design.brandnolandev.com",
      keywords: [
        "2D graphic design",
        "graphic designer Canada",
        "visual design",
      ],
    },
    project
  );
}

export default function ProjectPage() {
  return <SingleProject />;
}
