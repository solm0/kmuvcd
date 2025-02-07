import "./globals.css";
import SiteMap from "./components/ui/site-map";
import CalendarComponent from "./components/ui/calendar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col md:flex-row">
          <div className="h-fixed md:h-auto w-full md:w-1/2 overflow-hidden p-12">
            <SiteMap />
          </div>
          <div className="flex-1 w-full md:w-1/2 p-12 overflow-y-scroll z-10">{children}</div>
        </div>
        <CalendarComponent />
      </body>
    </html>
  );
}
