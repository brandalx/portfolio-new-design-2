"use client";

import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { MyCommandDialog } from "./my-command-dialog";
import Image from "next/image";
import navbarimg from "../../public/assets/myavatar.webp";
import ModeToggle from "./Switcher";
import { TextEffect } from "./text-effect";
import { NAVIGATION } from "../../config";
import unbounded from "@/lib/fonts";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/models/")) {
    return null;
  }
  return (
    <div>
      <header
        className={
          unbounded.className +
          " page-header bg-opacity-0  top-0 flex h-16 items-center gap-4 mx-auto w-full z-[200] navbarmain willchange"
        }
      >
        <nav className="hidden flex-col md:flex md:flex-row md:items-center md:justify-between w-full h-full border-b ">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              alt="Image"
              className="group-hover:scale-105 transition-all"
              width={50}
              height={50}
              quality={100}
              src={navbarimg}
            />
            <div className="ms-2 mt-1 hidden lg:flex lg:flex-col lg:items-start [900px]:block">
              <b className="mt-2 align-self-baseline glor-b">Brandon</b>
              <div className="flex items-center gap-x-2">
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 9600 4800"
                  >
                    <path
                      fill="#f00"
                      d="m0 0h2400l99 99h4602l99-99h2400v4800h-2400l-99-99h-4602l-99 99H0z"
                    />
                    <path
                      fill="#fff"
                      d="m2400 0h4800v4800h-4800zm2490 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z"
                    />
                  </svg>
                </span>
                <TextEffect
                  as="p"
                  preset="fade"
                  per="char"
                  className={
                    unbounded.className +
                    "text-muted-foreground text-xs font-light"
                  }
                  delay={0.3}
                >
                  Designer, photographer & developer, based in Canada
                </TextEffect>
              </div>
            </div>
          </Link>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {NAVIGATION.map((item) =>
                item.topbar ? (
                  item.subItems ? (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuTrigger
                        className={cn(
                          pathname === item.href
                            ? "text-foreground "
                            : "text-muted-foreground",
                          "hover:text-foreground"
                        )}
                      >
                        <Link href={item.href}> {item.title}</Link>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="">
                        <ul className=" text-current z-[200] bg-white dark:bg-black gap-4 text-nowrap  px-2 py-1  ">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.href}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "flex  gap-2",
                                    pathname === subItem.href
                                      ? "text-foreground"
                                      : "text-muted-foreground hover:text-foreground z-[99]"
                                  )}
                                >
                                  <div className="flex items-center gap-x-2">
                                    {" "}
                                    {subItem.icon}
                                    {subItem.title}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          item.special && item.topbar
                            ? "text-blue-600 hover:text-blue-500"
                            : "",
                          pathname === item.href
                            ? item.special
                              ? "text-blue-600 font-bold"
                              : "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                ) : null
              )}
              <NavigationMenuItem>
                <div className="flex gap-1">
                  <ModeToggle />
                  <MyCommandDialog />
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        <Sheet>
          <div className="w-full md:hidden justify-between flex items-center ">
            <Link href="/" className="gap-2 font-semibold w-fit">
              <Image
                alt="Image"
                className="group-hover:scale-105 transition-all"
                width={50}
                height={50}
                quality={100}
                src={navbarimg}
              />
            </Link>
            <div>
              <ModeToggle />
              <MyCommandDialog />
              <SheetTrigger className="ml-2" asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
            </div>
          </div>
          <SheetContent className="z-[160]" side="right">
            <SheetTitle></SheetTitle>
            <nav
              className={
                unbounded.className + " grid gap-3 text-lg font-medium"
              }
            >
              {NAVIGATION.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:text-foreground flex align-center items-center gap-x-3",
                      pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <style jsx>{`
        [data-radix-popper-content-wrapper] {
          transform-origin: top center !important;
        }
      `}</style>
    </div>
  );
}
