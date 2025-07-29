import Link from "next/link";
import { FC } from "react";
import AOSInit from "@/components/AOSInit";
import { AspectRatio } from "./ui/aspect-ratio";

interface ImageCardProps {
  src: string;
  title: string;
  category: string;
  subcategory: string;
}

const ImageCard: FC<ImageCardProps> = ({
  src,
  title,
  category,
  subcategory,
}) => {
  // Remove spaces and lowercase
  const cleanTitle = title.replace(/\s+/g, "").toLowerCase();
  const cleanSubcategory = subcategory.replace(/\s+/g, "").toLowerCase();

  // Generate URL-friendly title
  const makeTitleAsUrl = cleanTitle;

  // Map subcategory to URL path
  let makesubcategoryasUrl = cleanSubcategory;
  if (cleanSubcategory === "3ddesign") {
    makesubcategoryasUrl = "design3d";
  } else if (cleanSubcategory === "2ddesign") {
    makesubcategoryasUrl = "design2d";
  }

  // Display name for subcategory
  let makesubcategoryAsName = "";
  switch (makesubcategoryasUrl) {
    case "design3d":
      makesubcategoryAsName = "3D Design";
      break;
    case "design2d":
      makesubcategoryAsName = "2D Design";
      break;
    case "portraits":
      makesubcategoryAsName = "Portraits";
      break;
    case "architecture":
      makesubcategoryAsName = "Architecture";
      break;
    default:
      makesubcategoryAsName =
        makesubcategoryasUrl.charAt(0).toUpperCase() +
        makesubcategoryasUrl.slice(1);
  }

  // Display-friendly title
  const makeTtitleAsTitle = title.trim();

  return (
    <AspectRatio ratio={9 / 12}>
      <Link
        href={`/${category}/${makesubcategoryasUrl}/${makeTitleAsUrl}`}
        className="group max-h-[700px] h-full flex flex-col"
        data-aos="fade-up"
      >
        <div className="overflow-hidden rounded-lg relative">
          <AspectRatio ratio={9 / 16}>
            <img
              sizes="100vw"
              className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-105 h-full object-cover"
              src={src}
              alt={makeTtitleAsTitle}
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 ease-out group-hover:opacity-0"></div>
        </div>

        <div className="mt-4 flex flex-col flex-grow capitalize">
          <span className="text-sm text-gray-500 glor-l">
            {makesubcategoryAsName}
          </span>
          <h3 className="text-2xl font-semibold glor-b">{makeTtitleAsTitle}</h3>
        </div>
      </Link>
    </AspectRatio>
  );
};

export default ImageCard;
