import "./globals.css";
import HeaderSection from "./ui/header-section";
import RightSection from "./ui/right-section";
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

          <section className="relative px-4 flex-1 md:flex w-full h-auto overflow-hidden">
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