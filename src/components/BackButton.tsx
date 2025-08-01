"use client";

import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type BackButtonProps = {
  link?: string;
  text?: string;
};

export function BackButton({ link, text }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="link"
      className="dark:text-gray-400 cursor-pointer text-gray-700 glor-l m-0 p-0"
      onClick={handleClick}
    >
      <IconChevronLeft className="h-4 w-4" />
      {text || "Back"}
    </Button>
  );
}
