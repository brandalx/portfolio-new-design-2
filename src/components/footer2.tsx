"use client";
import { FOOTER_PAGES, NAVIGATION, OTHERS, SOCIALS } from "../../config/index";
import { IconChevronRight, IconPhoneCall } from "@tabler/icons-react";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { Separator } from "./ui/separator";
import TextPressure from "./textPressure";
import { useMedia } from "react-use";
import unbounded from "@/lib/fonts";
import { cn } from "@/lib/utils";
export default function Footer2() {
  const getYear = () => {
    return new Date().getFullYear();
  };
  const isMobile = useMedia("(max-width: 768px)", false);
  return (
    <MaxWidthWrapper>
      <footer className="page-footer bg-transparent mx-auto w-full    z-50 ">
        <Separator className="w-full" />

        {!isMobile ? (
          <div className="w-fit text-center mx-auto my-5">
            <Link href="/contacts">
              <TextPressure
                className="text-4xl md:text-5xl lg:text-[120px]"
                text="Get In Touch!"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                fontUrl="https://res.cloudinary.com/dzlatzgxe/raw/upload/v1753861493/Unbounded-VariableFont_wght_lzvbjo.ttf"
                italic={true}
                fontFamily="Unbounded"
                strokeColor="#ff0000"
                minFontSize={36}
              />
            </Link>
          </div>
        ) : (
          <div className="w-fit text-center mx-auto my-5">
            <Link href="/contacts">
              <h1
                className={cn(
                  unbounded.className,
                  "mt-2 lg:text-6xl  font-bold uppercase  mx-auto cursor-pointer text-4xl w-fit md:text-5xl lg:text-[120px]"
                )}
              >
                Get In Touch!
              </h1>
            </Link>
          </div>
        )}
        <div>
          <div className="  pt-2 ps-2 mb-4 text-center mx-auto flex justify-center">
            <Link target="_blank" href={"https://brandnolandev.com"}>
              <p
                className={
                  unbounded.className +
                  " text-sm underline  text-white   hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-x-2"
                }
              >
                See dev portfolio <IconChevronRight />
              </p>
            </Link>
          </div>
        </div>

        <div className="w-full py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 glor-l text-sm w-full gap-4">
            {NAVIGATION.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {page.title}
              </Link>
            ))}{" "}
            <Link
              href={"       https://old.brandnolandev.com/"}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Legacy
            </Link>
            <Link
              href={"https://newusandor.wixsite.com/design"}
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Design
            </Link>
            <Link
              target="_blank"
              href={"       https://old.brandnolandev.com/"}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Site Map
            </Link>
            <div className="flex flex-col gap-4 w-fit">
              {SOCIALS.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4 w-fit">
              {OTHERS.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <div className="mt-[50px]">
              <p className="  text-xs text-gray-400  w-fit mx-auto">
                © 2020 - {getYear()} Brandon Nolan. All Rights Reserved.
              </p>
            </div>
            <div className="flex mt-5 items-center cursor-pointer w-fit mx-auto underline hover:text-gray-300 text-sm">
              <IconPhoneCall className="h-4 w-4 mr-2" />
              <Link href="tel:14374393888">+1(437)-439-3888</Link>
            </div>
            <div className=" mt-5 text-xs text-gray-400 mx-auto w-fit">
              Canada | Global
            </div>
          </div>
        </div>
      </footer>{" "}
    </MaxWidthWrapper>
  );
}
