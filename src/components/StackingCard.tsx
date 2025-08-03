"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll, MotionValue } from "motion/react";
import { JSX, useRef } from "react";
import Image from "next/image";
import unbounded from "@/lib/fonts";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
const projects = [
  {
    title: "Developer Portfolio",
    description:
      "A showcase of innovative web and mobile development projects, highlighting expertise in creating responsive, user-friendly websites and applications with modern technologies.",
    src: "https://brandnolandev.com",
    link: "/assets/cursor/devport.png",
    color: "#5196fd",
  },
  {
    title: "3D Design",
    description:
      "A collection of immersive 3D designs, featuring intricate models and visualizations that blend creativity with technical precision for engaging digital experiences.",
    src: "/design3d",
    link: "/assets/cursor/21.webp",
    color: "#8f89ff",
  },
  {
    title: "2D Design",
    description:
      "A portfolio of vibrant 2D designs, showcasing bold graphics, illustrations, and layouts that capture visual storytelling with clarity and artistic flair.",
    src: "/design2d",
    link: "/assets/cursor/4.webp",
    color: "#13006c",
  },
  {
    title: "Contacts",
    description: "Get in touch with me",
    src: "/contacts",
    link: "/assets/cursor/contact.png",
    color: "#fd521a",
  },

  // {
  //   title: "About Me",
  //   description:
  //     "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
  //   src: "rock.jpg",
  //   link: "/assets/image2.jpeg",
  //   color: "#5196fd",
  // },
  // {
  //   title: "Photography",
  //   description:
  //     "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote.",
  //   src: "cactus.jpg",
  //   link: "https://images.unsplash.com/photo-1506792006437-256b665541e2?w=500&auto=format&fit=crop",
  //   color: "#fd521a",
  // },
];
export default function StackingCards(): JSX.Element {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <div className="bg-transparent " ref={container}>
      <section className="text-white   w-full   ">
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Card
              key={`p_${i}`}
              i={i}
              url={project?.link}
              src={project?.src}
              title={project?.title}
              color={project?.color}
              description={project?.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </div>
  );
}
interface CardProps {
  i: number;
  title: string;
  description: string;
  src: string;
  url: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}
export const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-[60vh]  my-10 py-10   w-full sticky top-0"
    >
      <Link href={src} className="   w-ful cursor-pointer">
        <motion.div
          style={{
            scale,
            top: `calc(-1vh + ${i * 5}px)`,
          }}
          className={` flex-col relative -top-[25%] h-[450px] w-[100%] md:w-[80%] flex mx-auto justify-center  rounded-md p-4 origin-top backdrop-blur-md   `}
        >
          <h2 className={unbounded.className + " text-4xl  font-semibold"}>
            {title}
          </h2>
          <div className={`flex h-full mt-5 gap-10`}>
            <div className={`w-[40%] relative top-[10%]`}>
              <p className="text-sm">{description}</p>
              <span className="flex items-center gap-2 pt-2">
                Read more <IconChevronRight />
              </span>
            </div>

            <div
              className={`relative w-[60%] h-full rounded-lg overflow-hidden `}
            >
              <motion.div
                className={`w-full h-full`}
                style={{ scale: imageScale }}
              >
                <Image fill src={url} alt="image" className="object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};
