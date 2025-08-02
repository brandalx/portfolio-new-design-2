import { BackButton } from "@/components/BackButton";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import SocialIcons from "@/components/SocialIcons";
import { CardSwipe } from "@/components/swiper";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
    url: "https://www.brandnolandev.com/about",
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
                Some information about me.
              </p>
            </div>

            <div>
              <p>
                {" "}
                Hi, I'm Brandon — a Full Stack Engineer and Graphic Designer
                passionate about building modern, performant web applications
                that combine function and form. What started as a creative
                curiosity evolved into a full-time commitment to crafting
                user-centric digital experiences across the stack.
              </p>
              <br />
              <p>
                {" "}
                Driven by the desire to solve real-world problems through clean
                design and efficient code, I specialize in developing scalable
                solutions using technologies like Next.js, React, Node.js, and a
                wide range of cloud and DevOps tools. My focus is always on
                usability, maintainability, and business value.
              </p>
              <br />
              <p>
                One of the most rewarding projects I've contributed to is DRIE,
                a collaborative platform built with friends that combines web
                development with tools for modern digital engagement. It's the
                kind of work that fuels my drive — creating practical solutions
                with creative freedom.
              </p>
              <br />
              <p>
                I believe every digital product deserves to look great, feel
                intuitive, and run smoothly. Beyond the screen, I also have a
                passion for drone piloting and aerial photography, capturing
                visuals from unique perspectives to complement my design work
                and storytelling.
              </p>
              When I'm not building apps or flying a drone, you'll probably find
              me on a soccer field or rewatching Friends and playing with my
              cats.
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
          </div>
        </div>
      </div>
    </div>
  );
}
