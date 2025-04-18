import "./globals.css";
import HeaderSection from "./ui/header-section";
import LeftSection from "./ui/left-section";
import RightSection from "./ui/right-section";
import Docs from "./ui/docs/docs";
import DocPage from "./ui/docs/doc-page";
import { Suspense } from "react";
import ModalWrapper from "./ui/modal-wrapper";

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="h-full">
        <div className="flex flex-col h-full overflow-hidden">
          <Suspense>
            <HeaderSection />
          </Suspense>
          <section className="relative px-4 flex-1 md:flex w-full h-auto overflow-x-auto">
            <LeftSection>
              <Docs>
                <DocPage />
              </Docs>
            </LeftSection>
            <RightSection>
              {children}
            </RightSection>
            
            <ModalWrapper>
              {modal}
            </ModalWrapper>
          </section>
        </div>
      </body>
    </html>
  );
}