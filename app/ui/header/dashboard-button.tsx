'use client';

import { usePathname, useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import clsx from "clsx";

export default function DashboardButton() {
  const pathname = usePathname();
  const router = useRouter();
  
  const isModal = pathname.startsWith('/user/');

  const handleClick = () => {
    if (isModal) {
      if (window.history.length > 1) {
        router.back();
      } else {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/user/dashboard';
    }
  }

  return (
    <div className="fixed w-8 h-8 right-4">
      <button
        onClick={handleClick}
        className={clsx("w-full h-full flex items-center justify-center rounded-full bg-gray-200 hover:text-gray-400 transition-colors", isModal && "bg-gray-900 text-gray-100")}
      >
        <UserRound className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}