import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Monitors 3JS | Brandon Nolan",
  description:
    "Discover Brandon Nolan's Three.js project featuring an interactive 3D scene with multiple computer monitors and a stylized cat model observing them. Built with React Three Fiber and Drei, this project showcases instanced rendering, reflective materials, post-processing effects like bloom and depth of field, and smooth camera animations for an immersive experience.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "React Three Fiber",
    "Drei",
    "JavaScript",
    "WebGL",
    "3D Animation",
    "Interactive Design",
    "Postprocessing",
    "Reflections",
    "3D modeling",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Monitors 3JS | Brandon Nolan",
    description:
      "Explore Brandon Nolan's immersive Three.js project featuring interactive computer monitors and a stylized cat model. Built with React Three Fiber, Drei, and advanced WebGL techniques, it includes reflective materials, post-processing effects, and dynamic camera movements. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff/monitors",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Monitors 3JS by Brandon Nolan",
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
    title: "Monitors 3JS | Brandon Nolan",
    description:
      "Check out my Three.js monitors project featuring interactive 3D computer monitors and a stylized cat model. Built with React Three Fiber, Drei, and advanced WebGL techniques, including reflections and post-processing effects. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Monitors 3JS by Brandon Nolan",
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
        src={"https://monitors.brandnolandev.com"}
        title="Interactive Content"
        className="w-full h-full "
      ></iframe>
    </div>
  );
};

export default Page;
