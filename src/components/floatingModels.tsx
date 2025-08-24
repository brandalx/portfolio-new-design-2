"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useMedia } from "react-use";
import navbarimg from "@/public/assets/myavatar.webp";
import { IconChevronLeft } from "@tabler/icons-react";

export default function NavBarModels() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMedia("(max-width: 768px)", true); // Default to true for initial render

  if (!pathname.startsWith("/models/")) {
    return null;
  }

  return (
    <nav
      className={`absolute ${
        isMobile
          ? "bottom-[8rem] right-0"
          : "top-4 left-1/2 right-auto transform -translate-x-1/2"
      } z-[9999]`}
    >
      <div className="bg-opacity-50 backdrop-blur-2xl rounded-full px-4 py-2 flex items-center justify-between shadow-lg">
        {/* <Link
          title="Go To Home Page"
          href="/"
          className="flex items-center font-semibold me-2 mb-1"
        >
          <Image
            alt="Image"
            className="transition-all"
            width={30}
            height={30}
            quality={65}
            src={navbarimg}
          />
        </Link> */}

        {/* Desktop Links (shown only on non-mobile screens) */}
        {!isMobile && (
          <div
            style={{ filter: "invert(100%)" }}
            className="flex items-center gap-4 text-sm text-gray-400"
          >
            <button
              className="cursor-pointer"
              onClick={() => router.push("/design")}
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <Link href="/design" className="hover:underline">
              Design
            </Link>
            <Link href="/photography" className="hover:underline">
              Photography
            </Link>
            <Link href="https://brandnolandev.com" className="hover:underline">
              Code
            </Link>
            <Link href="/contacts" className="hover:underline">
              Contacts
            </Link>
          </div>
        )}

        {/* Mobile Hamburger (shown only on mobile screens) */}
        {isMobile && (
          <div className="flex items-center cursor-pointer hover:opacity-85">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu (shown only when hamburger is clicked on mobile) */}
      {isMobile && menuOpen && (
        <div className="mt-2 bg-transparent backdrop-blur-xl rounded-lg p-4 text-xs flex flex-col gap-2 text-gray-200 cursor-pointer">
          <button
            className="flex items-center gap-2 hover:underline cursor-pointer"
            onClick={() => {
              router.push("/design");
              setMenuOpen(false);
            }}
          >
            <IconChevronLeft className="w-4 h-4" /> Back to Design
          </button>
          <Link
            className="hover:underline"
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="hover:underline"
            href="/photography"
            onClick={() => setMenuOpen(false)}
          >
            Photography
          </Link>
          <Link
            className="hover:underline"
            href="https://brandnolandev.com"
            onClick={() => setMenuOpen(false)}
          >
            Code
          </Link>
          <Link
            className="hover:underline"
            href="/contacts"
            onClick={() => setMenuOpen(false)}
          >
            Contacts
          </Link>
        </div>
      )}
    </nav>
  );
}
