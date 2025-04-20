'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function useIsOpen() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  
    useEffect(() => {
      if (searchParams.get("expand") === "true") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, [searchParams]);
  
  return isOpen;
}
