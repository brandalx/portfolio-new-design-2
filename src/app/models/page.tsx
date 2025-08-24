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
export const metadata: Metadata = {
  title: "3D Stuff | Brandon Nolan",
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
    title: "3D Stuff | Brandon Nolan's Three.js Portfolio",
    description:
      "Discover Brandon Nolan's Three.js projects, featuring retro 3D offices, interactive emulators, and modern web experiences with WebGL, JavaScript, and React Three Fiber. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan 3D Stuff Portfolio",
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
    title: "3D Stuff | Brandon Nolan's Three.js Portfolio",
    description:
      "Check out my Three.js projects: retro 3D environments, BBC Micro emulator, and interactive web experiences built with WebGL and JavaScript. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan 3D Stuff Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = () => {
  return (
    <div className="py-5 md:py-10">
      <MaxWidthWrapper className="pb-10 md:pb-20">
        <h2 className="text-4xl font-bold glor-b">3D Stuff</h2>
        <p className="text-muted-foreground mt-1 mb-4">
          Here are some of my Three JS Projects.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {MODELS.map((project) => (
            <Card className="flex flex-col h-full group" key={project.title}>
              <div className="p-4">
                <Link href={project.href}>
                  <div className="overflow-hidden rounded-lg h-48 sm:h-64 md:h-72 w-full">
                    <Image
                      alt={project.title}
                      className="group-hover:scale-105 transition-all object-cover w-full h-full"
                      width={1280}
                      height={720}
                      quality={100}
                      src={project.image}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </Link>
              </div>
              <CardHeader className="pt-0 pb-3 flex-1">
                <CardTitle>
                  <div className="flex gap-2 items-center">
                    <Link className="glor-b" href={project.href}>
                      {project.title}
                    </Link>
                  </div>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter className="*:mr-2 *:mb-2 flex flex-wrap mt-auto">
                {project.tags.map((tag) => (
                  <Badge variant="secondary" key={tag}>
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
