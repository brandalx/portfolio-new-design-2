"use client";
import React, { JSX, useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconBrandTelegram, IconChevronUp } from "@tabler/icons-react";
import { GlowingEffect } from "./glowing";
import navbarimg from "../../public/assets/myavatar.webp";
import Image from "next/image";
import { Button } from "./ui/button";
import gsap from "gsap";

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
  const [popoverVisible, setPopoverVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    const popover = popoverRef.current;

    if (!button || !popover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const distanceX = e.clientX - (rect.left + rect.width / 2);
      const distanceY = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 100; // Magnetic field radius

      if (distance < maxDistance) {
        setPopoverVisible(true);
        const strength = (1 - distance / maxDistance) * 0.3; // Reduced strength for subtler effect
        gsap.to(popover, {
          x: distanceX * strength,
          y: distanceY * strength,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        setPopoverVisible(false);
        gsap.to(popover, {
          x: 0,
          y: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseEnter = () => {
      setPopoverVisible(true);
      gsap.to(popover, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    };

    const handleMouseLeave = () => {
      setPopoverVisible(false);
      gsap.to(popover, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
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
          "max-w-fit fixed top-5 inset-x-0 mx-auto  dark:border-white/[0.2] transition-all rounded-full dark:bg-black/50 navbarmain bg-black text-white shadow-xl z-[10] pr-2 pl-8 py-2 items-center justify-center space-x-4 hidden md:flex text-xs blir backdrop-blur-lg",
          className
        )}
      >
        <Link
          className="hover:opacity-75 transition-all relative rounded-full"
          href={"/"}
        >
          <div className="rounded-full">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <Image
              alt="Image"
              className="group-hover:scale-105 transition-all rounded-full"
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
              "relative items-center flex space-x-1 dark:hover:text-neutral-300 hover:text-neutral-200 transition-all glor-l"
            )}
          >
            <span className="block">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}
        <Link
          href="/contacts"
          className="border relative p-2 rounded-full px-4 hover:text-gray-300 glor-b transition-all"
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <span className="flex items-center">
            <span className="me-2">Contact</span>
            <IconBrandTelegram className="w-4 h-4" />
          </span>
        </Link>
        <div className="relative">
          <Button
            variant={"ghost"}
            className="rounded-full p-4 cursor-pointer"
            onClick={scrollToTop}
            ref={buttonRef}
          >
            <IconChevronUp className="h-4 w-4" />
          </Button>
          <div
            ref={popoverRef}
            className={cn(
              "absolute top-0 left-full ml-2 backdrop-blur-3xl bg-black/60 text-white text-xs  text-nowrap px-3 p-2  py-1 rounded-full shadow-lg border border-white/[0.2] z-[20]",
              popoverVisible ? "block" : "hidden"
            )}
            style={{ transformOrigin: "center", opacity: 0, scale: 0.8 }}
          >
            Up we go
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
