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
  return (
    <AspectRatio ratio={9 / 12}>
      <Link
        href={`/${category}/${subcategory}/${title}`}
        className="group max-h-[700px]  h-full flex flex-col"
        data-aos="fade-up"
      >
        <div className="overflow-hidden rounded-lg relative">
          <AspectRatio ratio={9 / 16}>
            <img
              sizes="100vw"
              className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-105 h-full object-cover"
              src={src}
              alt={title}
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 ease-out group-hover:opacity-0"></div>
        </div>

        <div className="mt-4 flex flex-col flex-grow capitalize">
          <span className="text-sm text-gray-500 glor-l">{subcategory}</span>
          <h3 className="text-2xl font-semibold glor-b">{title}</h3>
        </div>
      </Link>{" "}
    </AspectRatio>
  );
};

export default ImageCard;
