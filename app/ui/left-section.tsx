import LeftNavLinks from "./left-nav-links";

export default async function LeftSection() {
  return (
    <section
      className="absolute bg-gray-200 w-56 h-full pt-16 flex flex-col"
    >
      <div className="bg-gray-300 h-12"></div>
      <LeftNavLinks />
    </section>
  );
}