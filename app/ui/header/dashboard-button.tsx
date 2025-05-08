'use client';

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import clsx from "clsx";

export default function DashboardButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const isModal = pathname.startsWith('/user/');

  const handleOpenModal = () => {
    const paramString = searchParams.toString();
    const hasParams = paramString.length > 0;
    const currentUrl = `${pathname}?${searchParams}`;

    if (isModal) {
      const previous = sessionStorage.getItem('previousUrl') || '/';
      router.push(previous);
    } else {
      sessionStorage.setItem('previousUrl', currentUrl);
      router.push(hasParams ? `/user/dashboard?${paramString}` : '/user/dashboard');
    }
  };

  return (
    <div className="fixed w-8 h-8 right-4">
      <button
        onClick={handleOpenModal}
        className={clsx("w-full h-full flex items-center justify-center  bg-gray-200 hover:text-gray-400 transition-colors", isModal && "bg-gray-900 text-gray-100")}
      >
        <UserRound className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}