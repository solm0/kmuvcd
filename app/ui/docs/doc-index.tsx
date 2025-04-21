'use client'

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams} from "next/navigation";
import { useState } from "react";
import { docMenus } from "@/app/lib/data/doc-menus";

export default function DocIndex() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hash, setHash] = useState<string>();

  return (
    <>
      {docMenus.map((menu) => (
        <div 
          key={menu.name}
          className="w-full h-auto flex flex-col items-start text-sm"
        >
          <div className="p-4 h-8 flex items-center">
            {menu.name}
          </div>
          <div className="ml-28 -mt-8 w-28 h-auto p-0">
            {menu.lists.map((link) => {
              return (
                <div
                  key={link.name}
                  className={clsx(
                    "w-28 h-8 break-keep hover:text-gray-400 transition-colors",
                    {
                      "text-gray-400": hash === `#${link.href}`,
                    },
                  )}
                >
                  <button
                    onClick={() => {
                      if (hash !== `#${link.href}`) setHash(`#${link.href}`);
                      document.getElementById(link.href)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      router.replace(`${pathname}?${searchParams}#${link.href}`, { scroll: false });
                    }}
                    className="w-full h-full flex items-center text-left p-4"
                    >
                    {link.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}