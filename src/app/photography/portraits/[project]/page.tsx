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
    "photography",
    "portraits"
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
      subcategory: "portraits",
      categoryDisplay: "Portrait Photography",
      baseUrl: "https://design.brandnolandev.com",
      keywords: [
        "portrait photography",
        "photographer Canada",
        "professional photography",
      ],
    },
    project
  );
}
export default function ProjectPage({ params }: Props) {
  return <SingleProject />;
}
