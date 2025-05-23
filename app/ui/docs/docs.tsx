'use client';

import DocIndex from "./doc-index";

export default function Docs({children}: {children: React.ReactNode}) {

  return (
    <nav className="w-full h-auto md:h-full md:w-auto md:flex">
      <div className="h-full w-full md:h-full transition-[width, height, colors] duration-300 z-10">
          <div className="w-auto fixed">
            <DocIndex />
          </div>
          <div
            className="border-l border-slate-500 ml-56 h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-4  [&::-webkit-scrollbar-thumb]:bg-gray-100"
          >
            {children}
          </div> 
      </div>
    </nav>
  )
}