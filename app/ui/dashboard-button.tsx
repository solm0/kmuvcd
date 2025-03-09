'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardButton() {
  const pathname = usePathname();
  const isHome = ['/calendar', '/lists', '/images'].some(path => pathname.startsWith(path));

  return (
    <Link
      href={isHome ? '/dashboard' : '/calendar'}
      className="w-full h-full hover:text-gray-500 transition-colors flex p-4 items-center text-sm"
    >
      <p>{isHome ? '대시보드' : '홈으로'}</p>
    </Link>
  );
}