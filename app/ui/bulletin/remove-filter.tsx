'use client'

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function RemoveFilter({ length }: { length: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams(); // ✅ this is reactive

  const bookmark = searchParams.get('bookmark');
  const search = searchParams.get('search');
  const tag = searchParams.get('tag');

  const isClean = !bookmark && !search && !tag;

  const handleRemove = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('bookmark');
    params.delete('search');
    params.delete('tag');

    const newQuery = params.toString();
    const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;

    router.push(newUrl);
  }

  return (
    <div className="fixed w-full bg-white h-10">
      <button
        className={clsx(
          "text-sm fixed text-gray-500 transition-colors w-auto",
          isClean
            ? "bg-white cursor-default"
            : "px-3 py-1 rounded-full border bg-gray-50 border-gray-300 hover:bg-gray-100 hover:text-gray-600"
        )}
        onClick={!isClean ? handleRemove : undefined}
      >
        {isClean ? `전체 ${length}건` : <p className="inline-flex gap-1 items-center">필터링 결과 {length}건 <X className="w-4 h-4" /></p>}
      </button>
    </div>
  );
}