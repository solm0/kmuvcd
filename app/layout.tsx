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
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-1/2">
            <SideNav />
          </div>
          <div className="w-1/2 p-12">{children}</div>
      </div>
      </body>
    </html>
  );
}
