'use client'

import { useEffect, useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import clsx from "clsx"
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function MoreOptions({login}: {login: boolean}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isClicked, setIsClicked] = useState(false);
  const param = searchParams.get('bookmark');

  const handleFilter = () => {
    const newClick = !isClicked;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("bookmark", newClick.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  }

  useEffect(() => {
    if (param && param === "true") {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [searchParams]);

  return (
    <div className="w-1/2 h-12 pb-4 flex items-center gap-4">
      {login &&
        <button
          onClick={() => handleFilter()}
          className={clsx("text-gray-400 hover:text-blue-400 flex items-center gap-1", {"text-blue-600": isClicked})}
        >
          <BookmarkIcon className="w-5 h-5" />내 북마크
        </button>
      }
    </div>
  )
}