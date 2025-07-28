import Link from "next/link";
import { FC } from "react";
import AOSInit from "@/components/AOSInit";

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
    <div>
      <AOSInit />
      <Link
        href={`/${category}/${subcategory}/${title}`}
        className="group block relative"
        data-aos="fade-up"
      >
        <div className="overflow-hidden rounded-lg relative">
          <img
            width={383}
            height={249}
            sizes="100vw"
            className="w-full h-auto object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            src={src}
            alt={title}
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 ease-out group-hover:opacity-0"></div>
        </div>
        <div className="mt-4">
          <span className="text-sm text-gray-500">{subcategory}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default ImageCard;
