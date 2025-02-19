import "./globals.css";
import HeaderSection from "./ui/header-section";
import LeftSection from "./ui/left-section";
import RightSection from "./ui/right-section";

export default function RootLayout({
  children,
  docs
}: Readonly<{
  children: React.ReactNode;
  docs: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="flex flex-col h-full overflow-hidden">
          <HeaderSection />
          <div className="flex mt-16 min-h-screen">
            <LeftSection>{docs}</LeftSection>
            <RightSection>{children}</RightSection>
          </div>
        </div>
      </body>
    </html>
  );
}