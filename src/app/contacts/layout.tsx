import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Brandon Nolan, a Full Stack Developer based in Canada. Reach out via email, phone, or the contact form for collaboration, inquiries, or hiring opportunities. Available for work!",
  keywords: [
    "Brandon Nolan contact",
    "full stack developer Canada",
    "hire developer",
    "web developer contact",
    "React developer",
    "Next.js developer",
    "contact form",
    "developer for hire",
    "Canada web development",
    "collaboration",
  ],
  openGraph: {
    title: "Contact | Brandon Nolan Design Portfolio",
    description:
      "Connect with Brandon Nolan, a Canadian Full Stack Developer, for project collaborations or hiring inquiries. Use the contact form, email (brandon.nolan.wisap@gmail.com), or call +1 (437) 439-3888. Available for work!",
    url: "https://design.brandnolandev.com/contacts",
    type: "website",

    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan Contact Page",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Brandon Nolan Portfolio",
    description:
      "Reach out to Brandon Nolan, a Full Stack Developer, via email, phone, or contact form for collaborations or hiring. Available for work in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan Contact Page",
        width: 1200,
        height: 630,
      },
    ],
  },
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper>
      <div>{children}</div>{" "}
    </MaxWidthWrapper>
  );
}
