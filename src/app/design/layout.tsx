import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Design",
  description:
    "Explore Brandon Nolan's design portfolio. As a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and 2D Illustrator based in Canada, I specialize in creating stunning 3D designs, including architecture renders, Blender animations, and 3D models, alongside innovative 2D graphic designs and illustrations. Discover my creative design projects. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "3D designer",
    "2D designer",
    "graphic designer",
    "motion designer",
    "UX/UI designer",
    "2D illustrator",
    "architecture renders",
    "Blender animations",
    "3D modeling",
    "graphic design",
    "illustrations",
    "web designer Canada",
    "portfolio",
    "hire designer",
    "hire 3D designer",
    "hire 2D designer",
  ],
  openGraph: {
    title: "Brandon Nolan | Design Portfolio",
    description:
      "Discover Brandon Nolan's design portfolio featuring stunning 3D architecture renders, Blender animations, 3D models, and innovative 2D graphic designs and illustrations. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com/design",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-design.jpg",
        alt: "Brandon Nolan Design Portfolio",
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
    title: "Brandon Nolan | Design Portfolio",
    description:
      "Explore my portfolio of stunning 3D designs, including architecture renders and Blender animations, alongside innovative 2D graphic designs and illustrations. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-design.jpg",
        alt: "Brandon Nolan Design Portfolio",
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
