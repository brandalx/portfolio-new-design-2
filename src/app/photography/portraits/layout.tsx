import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Portrait Photography",
  description:
    "Explore Brandon Nolan's portrait photography portfolio. As a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and 2D Illustrator based in Canada, I specialize in capturing evocative and compelling portrait photography. Discover my innovative portrait projects. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "portrait photographer",
    "graphic designer",
    "3D designer",
    "motion designer",
    "UX/UI designer",
    "2D illustrator",
    "portrait photography",
    "web designer Canada",
    "portrait art",
    "portfolio",
    "hire photographer",
    "hire portrait photographer",
  ],
  openGraph: {
    title: "Brandon Nolan | Portrait Photography Portfolio",
    description:
      "Discover Brandon Nolan's portrait photography portfolio featuring evocative and compelling portraits. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com/photography/portraits",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-portrait-photography.jpg",
        alt: "Brandon Nolan Portrait Photography Portfolio",
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
    title: "Brandon Nolan | Portrait Photography Portfolio",
    description:
      "Explore my portfolio of evocative and compelling portrait photography. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-portrait-photography.jpg",
        alt: "Brandon Nolan Portrait Photography Portfolio",
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
