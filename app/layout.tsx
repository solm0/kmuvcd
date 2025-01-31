import "./globals.css";
import SiteMap from "./components/ui/site-map";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col md:flex-row">
          <div className="h-fixed md:h-auto w-full md:w-1/2 overflow-hidden">
            <SiteMap />
          </div>
          <div className="flex-1 w-full md:w-1/2 p-12 overflow-y-scroll">{children}</div>
      </div>
      </body>
    </html>
  );
}
