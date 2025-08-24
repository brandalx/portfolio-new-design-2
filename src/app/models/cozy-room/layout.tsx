import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Cozy Room 3JS Model | Brandon Nolan",
  description:
    "Explore Brandon Nolan's Three.js project, a cozy room with a clickable computer monitor launching a Windows 7-inspired operating system. Built with Three.js, WebGL, and JavaScript, this project features realistic lighting, modern design, and interactive games for an engaging 3D experience.",
  keywords: [
    "Brandon Nolan",
    "Three.js",
    "WebGL",
    "JavaScript",
    "3D modeling",
    "UI/UX",
    "interactive design",
    "game development",
    "Windows 7",
    "cozy room",
    "portfolio",
    "hire developer",
  ],
  openGraph: {
    title: "Cozy Room 3JS Model | Brandon Nolan's Three.js Portfolio",
    description:
      "Discover Brandon Nolan's Three.js cozy room model, featuring a clickable monitor with a Windows 7-inspired OS and interactive games. Built with WebGL and JavaScript, it showcases realistic lighting and modern design. Based in Canada, available for hire.",
    url: "https://www.brandnolandev.com/3d-stuff/cozy-room",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Cozy Room 3JS Model by Brandon Nolan",
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
    title: "Cozy Room 3JS Model | Brandon Nolan's Three.js Portfolio",
    description:
      "Check out my Three.js cozy room model with a Windows 7-inspired OS and interactive games, built with WebGL and JavaScript. Features realistic lighting and modern design. Available for hire!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Cozy Room 3JS Model by Brandon Nolan",
        width: 1200,
        height: 630,
      },
    ],
  },
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;
