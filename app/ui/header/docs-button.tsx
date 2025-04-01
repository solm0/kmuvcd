'use client'

import { PanelLeft } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from 'clsx';

export default function DocsButton() {
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
    <>
      <div
        className={clsx(
          "w-auto h-8 bg-gray-100 transition-colors duration-300 hover:text-gray-400",
          isOpen && "md:w-[52rem] !h-12"
        )}
        onClick={handleOpen}
      >
        <div className='h-8 flex items-center px-4 gap-2'>
          <p className="break-keep text-sm top-0">국민대학교 시각디자인학과</p>
          <PanelLeft className={clsx(
            'w-[15px] h-[15px] ml-auto',
            isOpen && 'mr-2'
          )} />
        </div>
      </div>
    </>
  )
}