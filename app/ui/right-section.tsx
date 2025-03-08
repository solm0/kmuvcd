import { Suspense } from "react";

export default async function RightSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative bg-white w-auto grow h-full z-30 overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </section>
  );
}