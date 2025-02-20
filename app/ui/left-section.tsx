import LeftNavLinks from "./left-nav-links";

export default async function LeftSection() {
  return (
    <section className="relative w-auto h-[calc(100%-4rem)] z-30">
      <LeftNavLinks />
    </section>
  );
}