import { FOOTER_PAGES, NAVIGATION, OTHERS, SOCIALS } from "../../config/index";
import { IconPhoneCall } from "@tabler/icons-react";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { Separator } from "./ui/separator";

export default function Footer() {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <footer className="page-footer bg-transparent mx-auto w-full   md:px-20 z-50 ">
      <MaxWidthWrapper>
        <Separator className="w-full" />
        <div className=" w-full py-6 ">
          <div className="grid grid-cols-3 glor-l text-sm w-full">
            <div className="flex flex-col gap-4 w-fit ">
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
            </div>
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
          <div>
            <Link href="/contacts">
              <p className="text-3xl text-center mt-[50px] glor-b transition-all hover:scale-105   w-fit mx-auto">
                Available <br />
                For <br />
                Work
              </p>
            </Link>
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
      </MaxWidthWrapper>
    </footer>
  );
}
