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
import { Menu, Square } from "lucide-react";

import { usePathname } from "next/navigation";
import { NAVIGATION } from "../../config";
import { cn } from "../lib/utils";
import { MyCommandDialog } from "./my-command-dialog";
import Image from "next/image";
import navbarimg from "../../public/assets/myavatar.webp";
import ModeToggle from "./Switcher";
import { TextEffect } from "./text-effect";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      {" "}
      <header
        className="page-header bg-opacity-0	 top-0 flex h-16 items-center gap-4  mx-auto w-full  
 max-w-screen-xl px-6 md:px-20 z-50 navbarmain "
      >
        <nav className="hidden   flex-col  md:flex md:flex-row md:items-center md:justify-between w-full h-full border-b glor-l">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              alt="Image"
              className="group-hover:scale-105 transition-all"
              width={50}
              height={50}
              quality={100}
              src={navbarimg}
            />
            <div
              className="ms-2 mt-1 hidden lg:flex lg:flex-col lg:items-start [900px]:block
  "
            >
              <b className=" mt-2 align-self-baseline  glor-b  "> Brandon</b>

              <TextEffect
                as="p"
                preset="fade"
                per="char"
                className="text-muted-foreground glor-l  text-xs"
                delay={0.3}
              >
                Full stack Engineer
              </TextEffect>
            </div>
          </Link>
          <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "hover:text-foreground flex items-center gap-x-2",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {/* <span> {item.icon}</span>  */}
                {item.title}
              </Link>
            ))}
            {/* <ContactForm>
            <p
              role="button"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </p>
          </ContactForm> */}
            <div className="flex gap-1">
              <ModeToggle />
              <MyCommandDialog />
            </div>
          </div>
        </nav>
        <Sheet>
          <div className="w-full  md:hidden justify-between flex items-center">
            <Link href="/" className=" gap-2 font-semibold w-fit ">
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
                    {/* <span> {item.icon}</span> */}
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
              {/* <ContactForm>
              <p
                role="button"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </p>
            </ContactForm> */}
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
}
