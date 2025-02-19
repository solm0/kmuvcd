import "./globals.css";
import HeaderSection from "./ui/header-section";
import LeftSection from "./ui/left-section";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderSection />
        <LeftSection>{children}</LeftSection>
        <div className="flex flex-col md:flex-row">
          <div className="md:h-auto w-full md:w-1/2 md:fixed overflow-hidden p-12">
          </div>
        </div>
      </body>
    </html>
  );
}