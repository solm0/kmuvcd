'use client';

import clsx from "clsx";
import { useState, useEffect } from "react";
import { X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import DocIndex from "./doc-index";


export default function Docs({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    const newOpen = !isOpen;
    
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("expand", newOpen.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

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
      <div className="absolute border-black border-r border-b w-8 h-8 -ml-4 -mt-4 z-0"></div>
      <div className="absolute border-black border-r border-t w-8 h-8 bottom-0 -mb-4 -ml-4 z-0"></div>
      <div className="absolute border-black border-l border-b w-8 h-8 right-0 -mr-4 -mt-4 z-0"></div>
      <div className="absolute border-black border-l border-t w-8 h-8 right-0 bottom-0 -mb-4 -mr-4 z-0"></div>
      <div className="absolute border-black border-r border-b w-8 h-8 right-0 -mr-8 -mt-4 z-0"></div>
      <div className="absolute border-black border-r border-t w-8 h-8 right-0 bottom-0 -mb-4 -mr-8 z-0"></div>
      <div
        className={clsx(
          "relative w-full h-12 md:h-full md:w-28 transition-[width, height, colors] duration-300 z-10",
          isOpen ? "h-[90vh] md:w-[42rem] bg-white" : "bg-gray-200 hover:bg-white"
        )}
        onClick={isOpen ? undefined : handleOpen}
      > 
        <div className="w-full h-12 flex p-4 items-center">
          {isOpen ? (
            <button onClick={handleOpen} className="ml-auto text-gray-600 hover:text-gray-900 z-80 transition-colors">
              <X />
            </button>
          ) : (
            <button onClick={handleOpen} className="ml-auto text-gray-600 hover:text-gray-900 z-80 transition-colors">

            </button>
          )}
        </div>

        <div className="flex h-[calc(100%-3rem)]">
          <div className={clsx("w-full md:w-28", isOpen ? "md:w-56" : "overflow-hidden" )}>
            <DocIndex />
          </div>
          <div className={clsx("w-full h-full p-4 overflow-x-auto", {"hidden": !isOpen})}>
            {children}
          </div>
        </div>
      </div>
    </nav>
  )
}