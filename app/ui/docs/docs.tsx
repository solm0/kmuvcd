'use client';

import clsx from "clsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DocIndex from "./doc-index";

export default function Docs({children}: {children: React.ReactNode}) {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      // console.log('closed', isOpen)
    }
  }, [searchParams]);

  return (
    <nav className="w-full h-auto md:h-full md:w-auto md:flex">
      <div
        className={clsx(
          "relative w-full h-12 md:h-full md:w-0 transition-[width, height, colors] duration-300 z-10",
          isOpen && "h-[90vh] md:w-[52rem] md:mr-4"
        )}
        
      >
        {isOpen &&
          <div className="flex h-full bg-gray-100">
            <div className={clsx("w-full md:w-28", isOpen ? "md:w-56" : "overflow-hidden" )}>
              <DocIndex />
            </div>
            <div className={clsx("w-full h-full p-4 overflow-x-auto", {"hidden": !isOpen})}>
              {children}
            </div>
            <div className="fixed top-0 left-0 w-[53rem] h-screen bg-gray-100 -z-10"></div>
          </div>
        }
      </div>
    </nav>
  )
}