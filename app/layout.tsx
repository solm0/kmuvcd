import "./globals.css";
import HeaderSection from "./ui/header-section";
import LeftSection from "./ui/left-section";
import RightSection from "./ui/right-section";

export default function RootLayout({
  docs,
  main
}: Readonly<{
  docs: React.ReactNode;
  main: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="flex flex-col h-full overflow-hidden">
          <HeaderSection />
          <div className="flex mt-12 min-h-screen">
            <LeftSection>{docs}</LeftSection>
            <RightSection>{main}</RightSection>
          </div>
        </div>
      </body>
    </html>
  );
}