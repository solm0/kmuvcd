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
      <body className="h-full">
        <div className="flex flex-col h-full overflow-hidden">
          <HeaderSection />
          <div className="flex fixed w-full top-12 h-[calc(100%-3rem)]">
            <LeftSection>
              <Docs>
                <DocPage />
              </Docs>
            </LeftSection>
            <RightSection>{children}</RightSection>
          </div>
        </div>
      </body>
    </html>
  );
}