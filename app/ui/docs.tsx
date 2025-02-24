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
      console.log('closed', isOpen)
    }
  }, [searchParams]);

  return (
    <nav className="h-full w-auto flex">
      <div
        className={clsx(
          "bg-gray-200 h-full w-28 transition-[width, colors] duration-300",
          isOpen ? "w-[42rem]" : "hover:bg-gray-300"
        )}
        onClick={isOpen ? undefined : handleOpen}
      > 
        <div className="bg-gray-400 w-full h-12 flex p-4 items-center border-b border-gray-400">
          {isOpen && (
            <button onClick={handleOpen} className="ml-auto text-gray-600 hover:text-gray-900 z-80 transition-colors">
              <X />
            </button>
          )}
        </div>

        <div className="flex h-[calc(100%-3rem)]">
          <div className={clsx( "w-28", isOpen ? "w-56" : "overflow-hidden" )}>
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