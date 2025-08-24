import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MODELS } from "../../../config";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ImageCard2 } from "@/components/ImageCard2";
import { BackButton } from "@/components/BackButton";
export const metadata: Metadata = {
  title: "Interactive 3D Design | Brandon Nolan",
  description:
    "Explore Brandon Nolan's immersive Three.js projects, including retro 3D environments, interactive emulators, and modern web experiences. Built with Three.js, WebGL, and JavaScript, showcasing advanced 3D modeling, animations, and interactive design.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "WebGL",
    "3D modeling",
    "JavaScript",
    "interactive design",
    "retro computing",
    "3D animation",
    "React Three Fiber",
    "GSAP",
    "BBC Micro emulator",
    "Severance office",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Interactive 3D Design | Brandon Nolan's Three.js Portfolio",
    description:
      "Discover Brandon Nolan's Three.js projects, featuring retro 3D offices, interactive emulators, and modern web experiences with WebGL, JavaScript, and React Three Fiber. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan Interactive 3D Design Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive 3D Design | Brandon Nolan's Three.js Portfolio",
    description:
      "Check out my Three.js projects: retro 3D environments, BBC Micro emulator, and interactive web experiences built with WebGL and JavaScript. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan Interactive 3D Design Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = () => {
  return (
    <div className="py-5 md:py-10 ">
      <MaxWidthWrapper className="pb-10 md:pb-20">
        <BackButton />
        <h2 className="text-4xl font-bold glor-b mt-[50px]">
          Interactive 3D Design
        </h2>
        <p className="text-muted-foreground mt-1 mb-4 max-w-3xl">
          Here are some of my Blender projects that I made with interactive
          features for the web using Three.js.
          <br /> For the best experience, I recommend viewing them on a
          computer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {MODELS.map((project) => (
            <ImageCard2 model={project} key={project.title} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
