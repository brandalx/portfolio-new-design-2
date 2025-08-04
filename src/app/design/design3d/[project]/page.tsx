import { Metadata } from "next";
import SingleProject from "@/components/single-project/page";
import { getProjectData, generateProjectMetadata } from "@/lib/metadata-utils";

type Props = {
  params: { project: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project } = params;
  const decodedProjectName = decodeURIComponent(project);
  const projectData = await getProjectData(
    decodedProjectName,
    "design",
    "design3d"
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
      subcategory: "design3d",
      categoryDisplay: "3D Design",
      baseUrl: "https://design.brandnolandev.com",
      keywords: [
        "3D design",
        "3D modeling",
        "3D designer Canada",
        "3D graphics",
      ],
    },
    project
  );
}

export default function ProjectPage({ params }: Props) {
  return <SingleProject />;
}
