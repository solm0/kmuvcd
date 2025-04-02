'use client'

import DashboardButton from './header/dashboard-button';
import DocsButton from './header/docs-button';
import ViewButton from './header/view-button';
import CategoryButton from './header/category-button';
import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import clsx from 'clsx';

export default function HeaderSection() {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("expand") === "true") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      // console.log('closed', isOpen)
    }
  }, [searchParams]);

  return (
    <section
      className="relative w-screen flex h-auto z-40 p-4"
    >
      <Suspense>
        <DocsButton />
        <div className={clsx('mt-12 md:mt-0 md:ml-56 flex flex-wrap gap-4', isOpen && "md:ml-[53rem]")}>
          <ViewButton />
          <CategoryButton />
        </div>
        <DashboardButton />
      </Suspense>
    </section>
  );
}