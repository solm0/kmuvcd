import { Suspense } from "react";

export default async function LeftSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative w-auto h-[calc(100%-3rem)] z-30">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </section>
  );
}