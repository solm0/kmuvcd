export default async function RightSection({children}: {children: React.ReactNode}) {
  return (
    <section className="relative w-auto h-[calc(100%-4rem)] z-30 overflow-x-auto">
     {children}
    </section>
  );
}