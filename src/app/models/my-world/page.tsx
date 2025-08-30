import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My World 3JS | Brandon Nolan",
  description:
    "Explore Brandon Nolan's My World Three.js project — an interactive 3D map where users can navigate and interact with elements to discover his journey as a designer and developer. Built with Blender and Three.js, it features animated scenes, storytelling, and hidden surprises, including a BB-8 Easter egg from Star Wars. A personal, immersive 3D experience showcasing advanced WebGL techniques.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "Blender",
    "JavaScript",
    "WebGL",
    "3D Animation",
    "Interactive Storytelling",
    "Exploration",
    "Easter Egg",
    "Personal Project",
    "Portfolio",
    "Hire Developer",
  ],
  openGraph: {
    title: "My World 3JS | Brandon Nolan",
    description:
      "Dive into My World 3JS — an interactive 3D map built with Blender and Three.js. Explore Brandon Nolan's environments, story, and interactive elements, including a hidden BB-8 Easter egg. A deeply immersive experience showcasing animation and WebGL mastery.",
    url: "https://www.brandnolandev.com/models/my-world",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/my-world.webp",
        alt: "My World 3JS by Brandon Nolan",
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
    title: "My World 3JS | Brandon Nolan",
    description:
      "Explore My World 3JS — an interactive 3D map where you can discover Brandon Nolan's journey as a designer and developer. Built with Blender and Three.js, featuring animations, storytelling, and a hidden BB-8 Easter egg. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/my-world.webp",
        alt: "My World 3JS by Brandon Nolan",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const Page = () => {
  // useEffect(() => {
  //   // Disable scrolling
  //   document.body.style.overflow = "hidden";

  //   return () => {
  //     // Re-enable scrolling when component unmounts
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);
  return (
    <div className="h-screen overflow-hidden">
      <NavBarModels />
      <iframe
        src={"https://brandon-world.brandnolandev.com"}
        title="Interactive Content"
        className="w-full h-full "
      ></iframe>
    </div>
  );
};

export default Page;
