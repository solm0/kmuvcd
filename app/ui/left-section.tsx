import { Suspense } from "react";

export default async function LeftSection({children}: {children: React.ReactNode}) {
  return (
    <section className="fixed left-0 pt-4 h-auto bottom-0 w-full z-40 md:relative md:w-auto md:h-full md:z-30">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </section>
  );
}