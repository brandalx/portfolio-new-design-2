import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Experimental Room 3JS | Brandon Nolan",
  description:
    "Discover Brandon Nolan's Three.js project featuring an experimental room with a fisheye camera perspective. Built with advanced Three.js techniques, this interactive 3D environment showcases numerous animated items with keyframes, dynamic lighting, and experimental camera effects for a unique and immersive experience.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "JavaScript",
    "WebGL",
    "Fisheye Camera",
    "3D Animation",
    "Keyframes",
    "Experimental Design",
    "3D modeling",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Experimental Room 3JS | Brandon Nolan",
    description:
      "Explore Brandon Nolan's immersive Three.js project featuring an experimental room with a fisheye camera. Built with advanced Three.js techniques, this project showcases animated items with keyframes, dynamic lighting, and experimental camera effects. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff/experimental-room",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Experimental Room 3JS by Brandon Nolan",
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
    title: "Experimental Room 3JS | Brandon Nolan",
    description:
      "Check out my Three.js experimental room project with a fisheye camera, featuring animated items with keyframes and dynamic lighting. Built with advanced Three.js techniques. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Experimental Room 3JS by Brandon Nolan",
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
        src={"https://fisheye.brandnolandev.com"}
        title="Interactive Content"
        className="w-full h-full "
      ></iframe>
    </div>
  );
};

export default Page;
