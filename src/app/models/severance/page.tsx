import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Severance Macrodata Refinement Office | Brandon Nolan",
  description:
    "Discover Brandon Nolan's Three.js project recreating the eerie Severance Macrodata Refinement Office. Built with React Three Fiber, GSAP, and WebGL, this interactive 3D environment features dynamic animations, realistic lighting, and a microdata refinement game, capturing the show's retro-futuristic aesthetic.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "React Three Fiber",
    "GSAP",
    "WebGL",
    "JavaScript",
    "3D animation",
    "interactive game",
    "Severance",
    "retro-futuristic",
    "3D modeling",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Severance Macrodata Refinement Office | Brandon Nolan",
    description:
      "Explore Brandon Nolan's immersive Three.js recreation of the Severance Macrodata Refinement Office. Built with React Three Fiber and GSAP, this project features interactive 3D modeling, dynamic animations, and a playable microdata refinement game. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff/severance-office",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Severance Macrodata Refinement Office by Brandon Nolan",
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
    title: "Severance Macrodata Refinement Office | Brandon Nolan",
    description:
      "Check out my Three.js recreation of the Severance Macrodata Refinement Office, built with React Three Fiber and GSAP. Features interactive 3D animations and a microdata refinement game. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Severance Macrodata Refinement Office by Brandon Nolan",
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
        src={"https://severance.brandnolandev.com"}
        title="Interactive Content"
        className="w-full h-full "
      ></iframe>
    </div>
  );
};

export default Page;
