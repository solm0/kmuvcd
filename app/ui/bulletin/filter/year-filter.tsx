'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function YearFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");

  const handleFilter = (newYear: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    newParams.set("year", newYear);
    router.push(`${pathname}/?${newParams.toString()}`);
  }

  return (
    <label
      htmlFor="year"
      className="text-gray-800 flex items-center gap-2 cursor-pointer"
    >
      <select
        name="year"
        id="year"
        value={year ?? ""}
        onChange={(e) => handleFilter(e.target.value)}
        className="bg-transparent text-sm"
      >
        <option value={2024}>2024</option>
        <option value={2025}>2025</option>
      </select>
    </label>
  )
}