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
      <body className="h-full">
        <div className="flex flex-col h-full overflow-hidden">
          <HeaderSection />
          <div className="md:flex fixed md:w-full top-12 h-[calc(100%-3rem)]">
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