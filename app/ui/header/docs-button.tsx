'use client'

import { PanelLeft, ArrowLeft, X } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from 'clsx';

export default function DocsButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);
  const [isTooltip, setIsTooltip] = useState(true);

  const handleOpen = () => {
    setIsTooltip(false);

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
          "fixed w-52 h-8 transition-colors duration-300 hover:text-gray-400",
          !isOpen ? "bg-gray-100" : "w-full md:w-[52rem]"
        )}
        onClick={handleOpen}
      >
        <div className='h-8 flex items-center px-4 gap-2'>
          {isOpen &&
            <ArrowLeft className='w-[15px] h-[15px]' />
          }
          <p className="break-keep text-sm top-0">{clsx(isOpen ? "닫기" : "국민대학교 시각디자인학과")}</p>
          {!isOpen &&
            <PanelLeft className='w-[15px] h-[15px] ml-auto' />
          }
        </div>
      </div>
      {isTooltip && !isOpen &&
        <div className='fixed w-52 flex flex-row items-center text-sm animate-pulse ml-52'>
          <div className='w-4 border-solid border-r-8 border-y-transparent border-y-8 border-l-0 border-gray-300'></div>
          <div className='w-auto h-8 flex items-center bg-gray-300 px-3'>
            클릭하여 더 알아보세요!
            <button onClick={() => setIsTooltip(false)} className='hover:text-gray-500'>
              < X className='w-[17px] h-[17px] ml-2' />
            </button>
          </div>
        </div>
      }
    </>
  )
}