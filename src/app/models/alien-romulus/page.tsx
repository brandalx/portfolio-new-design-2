import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Alien Romulus 3JS | Brandon Nolan",
  description:
    "Step into Brandon Nolan's Alien Romulus Three.js project — an immersive sci-fi horror experience set aboard the Renaissance Station. Built with React Three Fiber, it features advanced shaders, custom LUTs for cinematic color grading, post-processing effects, and realistic reflections and lighting. Explore the eerie environment, watch the trailer inside the 3D scene, and even face-hug yourself. Inspired by the Alien franchise, crafted with open-source models and atmospheric music. Based in Canada, available for hire.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "React Three Fiber",
    "Drei",
    "JavaScript",
    "WebGL",
    "3D Environment",
    "Interactive Design",
    "Alien Franchise",
    "Sci-Fi Horror",
    "Advanced Shaders",
    "Postprocessing",
    "Custom LUTs",
    "Cinematic Lighting",
    "Reflections",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Alien Romulus 3JS | Brandon Nolan",
    description:
      "Explore Brandon Nolan's Alien Romulus 3JS project — a cinematic sci-fi horror experience aboard the Renaissance Station. Built with React Three Fiber, featuring advanced shaders, post-processing, custom LUTs, and realistic reflections for a film-like atmosphere. Watch the trailer and face-hug yourself inside the scene.",
    url: "https://www.brandnolandev.com/design/design3d/alien-romulus",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/alien-romulus.webp",
        alt: "Alien Romulus 3JS by Brandon Nolan",
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
    title: "Alien Romulus 3JS | Brandon Nolan",
    description:
      "Dive into my Alien Romulus 3JS project — an immersive sci-fi horror experience featuring advanced shaders, cinematic LUTs, post-processing, and eerie atmosphere aboard the Renaissance Station. Watch the trailer and explore the scene. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/alien-romulus.webp",
        alt: "Alien Romulus 3JS by Brandon Nolan",
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
      <div className="md:relative ">
        <div className="md:absolute md:top-[80px] md:left-0 md:right-0">
          {" "}
          <NavBarModels />
        </div>
      </div>
      <iframe
        src={"https://alien-romulus.brandnolandev.com"}
        title="Interactive Content"
        className="w-full h-full "
      ></iframe>
    </div>
  );
};

export default Page;
