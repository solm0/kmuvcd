import "./globals.css";
import HeaderSection from "./ui/header-section";
import LeftSection from "./ui/left-section";
import RightSection from "./ui/right-section";
import Docs from "./ui/docs/docs";
import DocPage from "./ui/docs/doc-page";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-full bg-gray-200">
        <div className="flex flex-col h-full overflow-hidden">
          <HeaderSection />
          <div className="px-4 pb-4 md:flex md:gap-4 fixed w-full top-12 h-[calc(100%-6rem)] md:h-[calc(100%-3rem)]">
            <LeftSection>
              <Docs>
                <DocPage />
              </Docs>
            </LeftSection>
            <RightSection>
              {children}
            </RightSection>
            <div className="absolute border-black border-l border-t bottom-0 right-0 w-8 h-8 -ml-4 -mt-4 z-0"></div>
            <div className="absolute border-black border-l border-b top-0 right-0 w-8 h-8 -ml-4 -mt-4 z-0"></div>
          </div>
        </div>
      </body>
    </html>
  );
}