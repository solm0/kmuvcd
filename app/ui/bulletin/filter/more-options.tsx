'use client'

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function MoreOptions({ login }: { login: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get("bookmark");

  const [isClicked, setIsClicked] = useState(param === "true"); // Initialize from URL

  useEffect(() => {
    setIsClicked(param === "true"); // Sync state when URL changes
  }, [param]);

  const handleFilter = () => {
    const newClick = !isClicked;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("bookmark", newClick.toString());
    router.push(`${pathname}?${newParams.toString()}`);

    setIsClicked(newClick); // Ensure immediate UI update
  };

  return (
    <div className="h-8 text-sm flex items-center gap-4">
      {login && (
        <label
          htmlFor="bookmark"
          className="text-gray-800 flex items-center gap-2 cursor-pointer"
        >
          <input
            id="bookmark"
            type="checkbox"
            checked={isClicked}
            onChange={handleFilter}
          />
          내가 북마크한 것만 보기
        </label>
      )}
    </div>
  );
}