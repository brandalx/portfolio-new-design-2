import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "3D Design",
  description:
    "Explore Brandon Nolan's 3D design portfolio. As a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and 2D Illustrator based in Canada, I specialize in creating stunning architecture renders, Blender animations, and detailed 3D models. Discover my innovative 3D design projects. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "3D designer",
    "graphic designer",
    "motion designer",
    "UX/UI designer",
    "2D illustrator",
    "architecture renders",
    "Blender animations",
    "3D modeling",
    "web designer Canada",
    "visual design",
    "3D design portfolio",
    "portfolio",
    "hire 3D designer",
    "hire animator",
  ],
  openGraph: {
    title: "Brandon Nolan | 3D Design Portfolio",
    description:
      "Discover Brandon Nolan's 3D design portfolio featuring stunning architecture renders, Blender animations, and detailed 3D models. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com/design/design3d",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-3d-design.jpg",
        alt: "Brandon Nolan 3D Design Portfolio",
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
    title: "Brandon Nolan | 3D Design Portfolio",
    description:
      "Explore my portfolio of stunning architecture renders, Blender animations, and 3D models. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-3d-design.jpg",
        alt: "Brandon Nolan 3D Design Portfolio",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
