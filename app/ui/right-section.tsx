import ViewChange from "./view-change";

export default async function RightSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative w-auto h-[calc(100%-4rem)] z-30 overflow-x-auto">
      <ViewChange>{children}</ViewChange>
    </section>
  );
}