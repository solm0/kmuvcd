import { Suspense } from "react";

export default async function RightSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative w-auto grow h-full z-30 overflow-hidden pb-4">
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </section>
  );
}