import LeftNavLinks from "./left-nav-links";

export default async function LeftSection() {
  return (
    <section className="fixed w-28 h-full pt-16 z-30">
      <LeftNavLinks />
    </section>
  );
}