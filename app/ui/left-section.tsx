import LeftNavLinks from "./left-nav-links";
import { Suspense } from "react";

export default async function LeftSection() {
  return (
    <section className="relative w-auto h-[calc(100%-4rem)] z-30">
      <Suspense>
        <LeftNavLinks />
      </Suspense>
    </section>
  );
}