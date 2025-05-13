'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ImageFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const layout = searchParams.get("view");

  const handleFilter = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    let newLayout;
    if (layout === 'lists') {
      newLayout = 'gallery'
    } else {
      newLayout = 'lists'
    }

    newParams.set("view", newLayout);
    router.push(`${pathname}/?${newParams.toString()}`);
  };

  return (
      <label
        htmlFor="box"
        className="w-auto text-sm flex items-center gap-2"
      >
        <input
            id="box"
            type="checkbox"
            checked={layout === 'gallery'}
            onChange={handleFilter}
        />
        이미지 모아보기
      </label>
  )
}