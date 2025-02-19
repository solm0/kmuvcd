import LeftNavLinks from "./left-nav-links";

export default async function LeftSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="fixed w-28 h-[calc(100%-4rem)] mt-16 z-30">
      <LeftNavLinks>{children}</LeftNavLinks>
    </section>
  );
}