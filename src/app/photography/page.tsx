import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section id="contact" className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="space-y-4">
          <div>
            <Link
              href="/photography/architecture"
              className="text-blue-600 hover:underline text-lg"
            >
              architecture
            </Link>
          </div>
          <div>
            <Link
              href="/photography/portraits"
              className="text-blue-600 hover:underline text-lg"
            >
              portraits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
