'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Tags from "./tags";

export default function TagSet() {
  const searchParams = useSearchParams();
  const [currentCategory, setCurrentCategory] = useState('*');
  const param = searchParams.get('category');

  useEffect(() => {
    if (param && param !== currentCategory) {
      setCurrentCategory(param);
    }
  }, [searchParams]);

  return (
    <div className="h-auto">
      {currentCategory !== '*' && <Tags category={currentCategory} />}
    </div>
  );
}