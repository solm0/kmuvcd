'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function BookmarkFilter({login}: {login: boolean}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("bookmark") === 'true';

  const handleFilter = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    const newClick = !param;

    newParams.set("bookmark", newClick.toString());
    router.push(`${pathname}/?${newParams.toString()}`);
  };

  return (
    <>
      {login && (
        <label
          htmlFor="bookmark"
          className="text-gray-800 flex items-center gap-2 cursor-pointer"
        >
          <input
            id="bookmark"
            type="checkbox"
            checked={param}
            onChange={handleFilter}
          />
          내 북마크만 보기
        </label>
      )}
    </>
  )
}