import NavBarModels from "@/components/floatingModels";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BBC Micro 3JS Emulator | Brandon Nolan",
  description:
    "Discover Brandon Nolan's Three.js-powered BBC Micro 8-bit computer emulator, featuring a photoreal 3D model, shader-based CRT effects, and a curated library of 100+ classic games. Built with Three.js, WebGL, WASM, and JavaScript, it offers interactive controls, audio, and nostalgic retro computing.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "WebGL",
    "JavaScript",
    "WASM",
    "BBC Micro",
    "retro computing",
    "emulator",
    "8-bit",
    "game collection",
    "CRT shader",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "BBC Micro 3JS Emulator | Brandon Nolan's Three.js Portfolio",
    description:
      "Explore Brandon Nolan's Three.js BBC Micro emulator, a photoreal 3D model with a functional 8-bit emulator and 100+ classic games. Built with WebGL, WASM, and JavaScript, it features CRT effects and interactive controls. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff/bbc-micro-emulator",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "BBC Micro 3JS Emulator by Brandon Nolan",
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
    title: "BBC Micro 3JS Emulator | Brandon Nolan's Three.js Portfolio",
    description:
      "Check out my Three.js BBC Micro emulator with a photoreal 3D model, CRT effects, and 100+ classic games, built with WebGL and WASM. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "BBC Micro 3JS Emulator by Brandon Nolan",
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
    <div className="h-screen overflow-hidden ">
      <NavBarModels />
      <iframe
        src={"https://bbcmicro.brandnolandev.com?disc1=elite.ssd&autoboot"}
        title="BBC Micro Computer"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default Page;
