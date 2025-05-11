'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search as Magnifying } from "lucide-react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleClear = () => {
    setValue("");
    handleSearch("");
  };

  return (
    <div className="h-4 w-auto text-sm flex items-center gap-1">
      <Magnifying className="h-4 w-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          const term = e.target.value;
          setValue(term);
          handleSearch(term);
        }}
        defaultValue={searchParams.get("search")?.toString()}
        className="bg-transparent w-full focus:outline-none border-b border-black"
      />
      {value && (
        <button
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}