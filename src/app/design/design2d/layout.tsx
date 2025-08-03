import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "2D Graphic Design",
  description:
    "Explore Brandon Nolan's 2D graphic design portfolio. As a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and 2D Illustrator based in Canada, I specialize in creating stunning 2D graphic designs that elevate brands and captivate audiences. Discover my innovative 2D design projects. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "2D graphic designer",
    "graphic designer",
    "UX/UI designer",
    "2D illustrator",
    "web designer Canada",
    "visual design",
    "2D design",
    "graphic design portfolio",
    "illustrations",
    "portfolio",
    "hire graphic designer",
    "hire 2D designer",
  ],
  openGraph: {
    title: "Brandon Nolan | 2D Graphic Design Portfolio",
    description:
      "Discover Brandon Nolan's 2D graphic design portfolio featuring stunning visuals and innovative designs. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com/design/design2d",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-2d-design.jpg",
        alt: "Brandon Nolan 2D Graphic Design Portfolio",
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
    title: "Brandon Nolan | 2D Graphic Design Portfolio",
    description:
      "Explore my portfolio of stunning 2D graphic designs, crafted with creativity and precision. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-2d-design.jpg",
        alt: "Brandon Nolan 2D Graphic Design Portfolio",
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
