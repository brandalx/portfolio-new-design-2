import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Train 3JS | Brandon Nolan",
  description:
    "Discover Brandon Nolan's Three.js project featuring a virtual train built with React Three Fiber and Drei. Scroll through multiple train cars, explore detailed seat arrangements, and experience smooth animations with realistic lighting and interactive camera controls. Based in Canada, available for hire.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "React Three Fiber",
    "Drei",
    "JavaScript",
    "WebGL",
    "3D Animation",
    "Interactive Design",
    "Train Simulation",
    "3D modeling",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Train 3JS | Brandon Nolan",
    description:
      "Explore Brandon Nolan's immersive Three.js project featuring a virtual train built with React Three Fiber and Drei. Scroll through train cars with detailed seats, smooth animations, and interactive controls. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff/train",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Train 3JS by Brandon Nolan",
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
    title: "Train 3JS | Brandon Nolan",
    description:
      "Check out my Three.js virtual train project built with React Three Fiber and Drei. Features smooth animations, detailed train cars, and interactive seat exploration. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Train 3JS by Brandon Nolan",
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
        src={"https://train.brandnolandev.com"}
        title="Interactive Content"
        className="w-full h-full "
      ></iframe>
    </div>
  );
};

export default Page;
