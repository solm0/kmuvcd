'use client'

export default function Layout({children}: {children: React.ReactNode}) {

  return(
    <div className="w-full h-full p-4">
      {children}
    </div>
  );
}