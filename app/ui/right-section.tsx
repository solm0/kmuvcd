import { Suspense } from "react";

export default async function RightSection({children}: {children: React.ReactNode}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}