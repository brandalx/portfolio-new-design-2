"use client";
import React, { JSX, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  IconBrandTelegram,
  IconChevronUp,
  IconZoom,
} from "@tabler/icons-react";
import { GlowingEffect } from "./glowing";
import navbarimg from "../../public/assets/myavatar.webp";
import Image from "next/image";
import { Button } from "./ui/button";
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle scroll visibility for the "Back to Top" button

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          " max-w-fit  fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] transition-all rounded-full dark:bg-black/50 navbarmain  bg-black text-white shadow-xl z-[10] pr-2 pl-8 py-2  items-center justify-center space-x-4 hidden md:flex text-xs ",
          className
        )}
      >
        <Link
          className="hover:opacity-75 transition-all relative rounded-full"
          href={"/"}
        >
          <div className="rounded-full">
            {" "}
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <Image
              alt="Image"
              className="group-hover:scale-105 transition-all rounded-full   "
              width={30}
              height={30}
              quality={100}
              src={navbarimg}
            />
          </div>
        </Link>
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1  dark:hover:text-neutral-300 hover:text-neutral-200 transition-all glor-l"
            )}
          >
            <span className="block ">{navItem.icon}</span>
            <span className="hidden sm:block ">{navItem.name}</span>
          </Link>
        ))}

        <Link
          href="/contacts"
          className="border relative p-2 rounded-full px-4 hover:text-gray-300 glor-b transition-all"
        >
          {" "}
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <span className="flex items-center">
            <span className="me-2">Contact</span>{" "}
            <IconBrandTelegram className=" w-4 h-4" />
          </span>
          {/* <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" /> */}
        </Link>
        <Button
          variant={"ghost"}
          className="rounded-full p-4"
          onClick={scrollToTop}
        >
          <IconChevronUp className="h-4 w-4 " />
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};
