import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Explore Brandon Nolan's photography portfolio. As a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and 2D Illustrator based in Canada, I specialize in capturing stunning architecture photography, including drone albums and modern buildings from New York and Europe, alongside evocative portrait photography. Discover my innovative photography projects. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "photographer",
    "architecture photographer",
    "portrait photographer",
    "graphic designer",
    "3D designer",
    "motion designer",
    "UX/UI designer",
    "2D illustrator",
    "drone architecture photography",
    "modern buildings",
    "New York architecture",
    "European architecture",
    "portrait photography",
    "web designer Canada",
    "portfolio",
    "hire photographer",
    "hire architecture photographer",
    "hire portrait photographer",
  ],
  openGraph: {
    title: "Brandon Nolan | Photography Portfolio",
    description:
      "Discover Brandon Nolan's photography portfolio featuring stunning drone architecture albums, modern buildings from New York and Europe, and evocative portrait photography. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com/photography",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-photography.jpg",
        alt: "Brandon Nolan Photography Portfolio",
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
    title: "Brandon Nolan | Photography Portfolio",
    description:
      "Explore my portfolio of stunning architecture and portrait photography, including drone captures and modern buildings from New York and Europe. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-photography.jpg",
        alt: "Brandon Nolan Photography Portfolio",
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
