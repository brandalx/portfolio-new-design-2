import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Architecture Photography",
  description:
    "Explore Brandon Nolan's architecture photography portfolio. As a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and 2D Illustrator based in Canada, I specialize in capturing stunning drone architecture albums, modern buildings, and architectural highlights from trips to New York and across Europe. Discover my innovative photography projects. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "architecture photographer",
    "graphic designer",
    "3D designer",
    "motion designer",
    "UX/UI designer",
    "2D illustrator",
    "drone architecture photography",
    "modern buildings",
    "New York architecture",
    "European architecture",
    "web designer Canada",
    "portfolio",
    "hire photographer",
    "hire architecture photographer",
  ],
  openGraph: {
    title: "Brandon Nolan | Architecture Photography Portfolio",
    description:
      "Discover Brandon Nolan's architecture photography portfolio featuring drone architecture albums, modern buildings, and captures from New York and Europe. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com/photography/architecture",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-architecture-photography.jpg",
        alt: "Brandon Nolan Architecture Photography Portfolio",
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
    title: "Brandon Nolan | Architecture Photography Portfolio",
    description:
      "Explore my portfolio of stunning drone architecture photography, modern buildings, and captures from New York and Europe. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-architecture-photography.jpg",
        alt: "Brandon Nolan Architecture Photography Portfolio",
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
