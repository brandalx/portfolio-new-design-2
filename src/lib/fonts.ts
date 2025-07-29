// lib/fonts.js
import { Unbounded } from "next/font/google";

const unbounded = Unbounded({
  weight: "700",
  subsets: ["latin"],
  display: "swap", // Ensures font loads with fallback to avoid FOUT
});

export default unbounded;
