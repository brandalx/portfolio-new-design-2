import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";
import { FloatingNavDemo } from "@/components/floatingnav";
import CookieConsenInitilizer from "@/components/cookieconsent";
import ScrollProgressDemo from "@/components/ScrollProgressDemo";
import ScrollToTopButton from "@/components/ScrollToTop";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/SmoothScroll";
import { Pointer } from "@/components/cursor";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Brandon Nolan's portfolio. I'm a Graphic Designer, 3D Designer, Motion Designer, UX/UI Designer, and Photographer based in Canada, passionate about creating stunning visuals, immersive 3D experiences, dynamic motion graphics, user-centered interfaces, and captivating photography. Explore my projects showcasing innovative designs and photography. Available for hire!",
  keywords: [
    "Brandon Nolan",
    "graphic designer",
    "3D designer",
    "motion designer",
    "UX/UI designer",
    "photographer",
    "web designer Canada",
    "visual design",
    "motion graphics",
    "3D modeling",
    "UI/UX design",
    "photography",
    "portfolio",
    "hire designer",
    "hire photographer",
  ],
  openGraph: {
    title: "Brandon Nolan | Graphic, 3D, Motion, UX/UI Designer & Photographer",
    description:
      "Explore Brandon Nolan's portfolio featuring innovative graphic designs, 3D visuals, motion graphics, user-centered UX/UI designs, and captivating photography. Based in Canada, available for hire.",
    url: "https://design.brandnolandev.com",
    type: "website",
    locale: "en_CA",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan Portfolio Home",
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
    title: "Brandon Nolan | Graphic, 3D, Motion, UX/UI Designer & Photographer",
    description:
      "Discover my portfolio of stunning graphic designs, 3D visuals, motion graphics, UX/UI designs, and photography. Available for hire in Canada and globally!",
    site: "@brandalx",
    creator: "@brandalx",
    images: [
      {
        url: "/assets/opengraph-image.jpg",
        alt: "Brandon Nolan Portfolio Home",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  initialScale: 1.0,
  width: "device-width",
  maximumScale: 1.0,
  viewportFit: "cover",
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Mouseflow script */}
        <Script
          id="mouseflow-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `  window._mfq = window._mfq || [];
        (function() {
          var mf = document.createElement("script");
          mf.type = "text/javascript"; mf.defer = true;
          mf.src = "//cdn.mouseflow.com/projects/20c2a113-f995-4133-bf98-2160ec0291ab.js";
          document.getElementsByTagName("head")[0].appendChild(mf);
        })();
            `,
          }}
        />
      </head>
      <SpeedInsights />
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MaxWidthWrapper>
          <FloatingNavDemo />
          <div>
            <ScrollProgressDemo /> <ScrollToTopButton />
          </div>
        </MaxWidthWrapper>
        {/* <SmoothScroll> */}
        <div className=" wrapper">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <MaxWidthWrapper>
              <Navbar />
            </MaxWidthWrapper>
            <div className="page-body">
              <CookieConsenInitilizer />
              {children}{" "}
            </div>
            <Footer /> <Toaster position="bottom-right" />
          </ThemeProvider>
        </div>
        {/* </SmoothScroll> */}
      </body>
    </html>
  );
}
