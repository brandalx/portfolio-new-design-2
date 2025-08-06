import { BackButton } from "@/components/BackButton";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import SocialIcons from "@/components/SocialIcons";
import { CardSwipe } from "@/components/swiper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IconChevronRight } from "@tabler/icons-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Brandon Nolan, a Full Stack Engineer and Graphic Designer based in Canada. Passionate about building modern web applications with Next.js, React, and Node.js, and creating user-centric designs. Explore my work on projects like DRIE and my interests in drone piloting and soccer. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "full stack developer",
    "graphic designer",
    "web development Canada",
    "Next.js developer",
    "React developer",
    "Node.js",
    "DRIE project",
    "drone piloting",
    "aerial photography",
    "portfolio about",
    "hire developer",
  ],
  openGraph: {
    title: "About | Brandon Nolan Portfolio",
    description:
      "Learn about Brandon Nolan, a Canadian Full Stack Engineer and Graphic Designer. Discover my expertise in Next.js, React, and Node.js, my work on the DRIE project, and my passion for drone piloting and soccer. Available for hire.",
    url: "https://design.brandnolandev.com/about",
    type: "website",

    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan About Page",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Brandon Nolan Portfolio",
    description:
      "Meet Brandon Nolan, a Full Stack Engineer and Graphic Designer from Canada. Check out my work in web development and design, including the DRIE project. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan About Page",
        width: 1200,
        height: 630,
      },
    ],
  },
};
export default function AboutPage() {
  const images = [
    { src: "/assets/image.jpg", alt: "Image 1" },
    { src: "/assets/image2.jpeg", alt: "Image 2" },
    { src: "/assets/image3.jpg", alt: "Image 6" },
    { src: "/assets/image4.jpg", alt: "Image 3" },
    { src: "/assets/image5.jpg", alt: "Image 4" },
    { src: "/assets/image6.jpg", alt: "Image 5" },
  ];
  return (
    <div>
      {" "}
      <div
        className="min-h-screen opacity-50 z-[-2] absolute w-full  pointer-events-none"
        style={{
          backgroundColor: "var(--bg-base)",
          WebkitMaskImage: `
      linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)
    `,
          maskImage: `
      linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
    `,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        {/* Sphere Grid Background with fade top and bottom */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "var(--bg-base)",
            backgroundImage: `
        linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, var(--glow) 0%, transparent 70%)
      `,
            backgroundSize: "32px 32px, 32px 32px, 100% 100%",
            WebkitMaskImage: `
        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
      `,
            maskImage: `
        linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)
      `,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        />
      </div>{" "}
      <div>
        <div className=" w-full mx-auto  max-w-screen-xl px-6 md:px-20 overflow-x-hidden mt-5">
          <BackButton />
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-20 overflow-x-hidden my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full space-y-3">
            <div>
              <h2 className="text-4xl font-bold glor-b">About</h2>
              <p className="text-muted-foreground mt-1 mb-4 glor-l">
                A glimpse into my creative world.
              </p>
            </div>
            <div>
              <p>
                Hi, I'm Brandon — a Graphic Designer and 3D Artist based in
                Canada, with a passion for crafting immersive UI/UX designs,
                dynamic motion graphics, and innovative 3D visuals. While I'm
                also a skilled full stack developer, my heart lies in creating
                visually stunning and user-centric digital experiences that
                captivate and engage.
              </p>
              <br />
              <p>
                My work blends creativity with functionality, specializing in
                tools like Figma, Adobe Creative Suite, Blender, and Cinema 4D
                to design intuitive interfaces, compelling motion graphics, and
                photorealistic 3D renders. I focus on delivering seamless user
                experiences that balance aesthetic appeal with practical
                usability, always keeping the end user in mind.
              </p>

              <br />
              <p>
                Beyond the screen, I'm passionate about drone cinematography,
                capturing breathtaking visuals that inspire my design work.
                Whether it's designing a sleek app interface or animating a
                dynamic motion sequence, I believe every project should tell a
                story and evoke emotion.
              </p>
              <p>
                When I'm not designing or coding, you'll find me on the soccer
                field, experimenting with new visual effects, or relaxing with
                my cats while binge-watching Friends.
              </p>
            </div>
          </div>
          <div>
            <div className="w-full flex justify-center">
              <div className="p-4 border w-fit rounded-lg bg-gradient-to-b dark:from-black/40 dark:to-black/80 h-fit   max-h-[800px] from-60%">
                <div className="w-full ">
                  <CardSwipe
                    images={images}
                    autoplayDelay={2000}
                    slideShadows={false}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-5">
              {" "}
              <div>
                {" "}
                <SocialIcons />
                <Link href={"/contacts"}>
                  <p className="glor-l mt-2 text-center hover:underline transition-all">
                    {" "}
                    Let's Connect
                  </p>
                </Link>
              </div>
            </div>
            <hr className="w-[40%] text-center mx-auto" />
            <div className="w-full flex justify-center ">
              {" "}
              <div>
                <Link href={"https://brandnolandev.com"}>
                  <p className="glor-b  text-center hover:underline transition-all flex items-center gap-x-2 justify-center text-blue-600">
                    {" "}
                    Dev portfolio {">"}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
