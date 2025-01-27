import "./globals.css";
import SideNav from "./ui/sidenav";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen flex-col md:flex-row">
          <div className="w-1/2 overflow-hidden">
            <SideNav />
          </div>
          <div className="w-1/2 p-12 overflow-y-scroll">{children}</div>
      </div>
      </body>
    </html>
  );
}
