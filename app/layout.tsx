import "./globals.css";
import SiteMap from "./ui/site-map";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col md:flex-row">
          <div className="md:h-auto w-full md:w-1/2 md:fixed overflow-hidden p-12">
            <SiteMap />
          </div>
          <div className="w-full md:w-1/2 md:absolute md:left-[50vw] r-0 p-12 pl-0 overflow-y-scroll z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
