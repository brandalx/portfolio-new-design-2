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

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      <header className="page-header bg-opacity-0  top-0 flex h-16 items-center gap-4 mx-auto w-full z-[200] navbarmain willchange">
        <nav className="hidden flex-col md:flex md:flex-row md:items-center md:justify-between w-full h-full border-b glor-l">
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
              <TextEffect
                as="p"
                preset="fade"
                per="char"
                className="text-muted-foreground glor-l text-xs"
                delay={0.3}
              >
                Designer, photographer, editor, developer based in Canada
              </TextEffect>
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
                                      : "text-muted-foreground hover:text-foreground"
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
          <div className="w-full md:hidden justify-between flex items-center">
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
          <SheetContent side="right">
            <SheetTitle></SheetTitle>
            <nav className="grid gap-3 text-lg glor-b font-medium">
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
