import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section id="contact" className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="space-y-4">
          <div>
            <Link
              href="/design/design2d"
              className="text-blue-600 hover:underline text-lg"
            >
              2D Design
            </Link>
          </div>
          <div>
            <Link
              href="/design/design3d"
              className="text-blue-600 hover:underline text-lg"
            >
              3D Design
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
