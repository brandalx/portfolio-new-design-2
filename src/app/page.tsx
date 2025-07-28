import Available from "@/components/available";
import Portfolio from "../components/portfolio/portfolio";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="glor-b">Portfolio</h1>
      <div>
        <Available />
      </div>
      <Portfolio />
      <section id="contact" className="py-12">
        <div className="mx-auto max-w-7xl-none px-4-none">
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
      </section>{" "}
      <section id="contact" className="py-12">
        <div className="mx-auto max-w-7xl-none px-4-none">
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
    </div>
  );
}
