"use client";

import { useEffect } from "react";
//@ts-expect-error - no error
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      // duration: 1000,
      // once: true,
    });
  }, []);

  return null;
}
