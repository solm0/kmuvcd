import AnimatedContainer from "@/app/ui/docs/animated-container";

export default async function Layout({children}: {children: React.ReactNode}) {
  
  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto p-4">
        images layout
      </div>
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}