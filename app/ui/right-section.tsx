import { Suspense } from "react";

export default async function RightSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative w-auto h-[calc(100%-3rem)] z-30 overflow-x-auto">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </section>
  );
}