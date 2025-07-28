"use client";
import React from "react";
import { FloatingNav } from "./floating-navbar";
import {
  IconBriefcase,
  IconColorSwatch,
  IconHome,
  IconMessage,
  IconPhoto,
  IconPrinter,
  IconShoppingBag,
  IconTextCaption,
  IconUser,
} from "@tabler/icons-react";
export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Photography",
      link: "/projects",
      icon: (
        <IconPhoto className="h-4 w-4 text-white hover:text-gray-500 transition-all " />
      ),
    },
    {
      name: "Design",
      link: "/about",
      icon: (
        <IconColorSwatch className="h-4 w-4 text-white hover:text-gray-500 transition-all " />
      ),
    },
    {
      name: "About",
      link: "/about",
      icon: (
        <IconUser className="h-4 w-4 text-white hover:text-gray-500 transition-all" />
      ),
    },
    // {
    //   name: "Goodies",
    //   link: "/goodies",
    //   icon: (
    //     <IconTextCaption className="h-4 w-4 text-white hover:text-gray-500 transition-all" />
    //   ),
    // },
  ];
  return (
    <div className="relative  z-[11] w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
