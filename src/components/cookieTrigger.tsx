"use client";
import {
  IconChevronRight,
  IconChevronRightPipe,
  IconCookie,
} from "@tabler/icons-react";
import * as CookieConsent from "vanilla-cookieconsent";
import { Button } from "./ui/button";
import { boolean } from "zod";

interface pass {
  inline?: boolean;
}

export default function CookieConsentTrigger({ inline }: pass) {
  const handleShowConsentPopup = () => {
    CookieConsent.show(true); // false to show the initial consent modal
  };

  return (
    <div>
      {inline ? (
        <p
          onClick={handleShowConsentPopup}
          className=" flex items-center gap-x-2 w-fit cursor-pointer"
        >
          {" "}
          Manage Cookies
        </p>
      ) : (
        <div>
          <Button
            variant={"ghost"}
            onClick={handleShowConsentPopup}
            className="flex items-center my-2 gap-x-2 bg-black rounded-full  text-white hover:bg-gray-900 text-xs"
          >
            Manage Cookies <IconChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
