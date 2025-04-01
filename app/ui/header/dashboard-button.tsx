'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardButton() {
  const pathname = usePathname();
  const isHome = !['/dashboard', '/email.confirmation', '/email-confirmation-resend', '/forgot-password', '/reset-password', '/signin', '/signup'].some(path => pathname.startsWith(path));

  return (
    <div className="w-auto h-8 ml-auto bg-gray-100">
      <Link
        href={isHome ? '/dashboard' : '/'}
        className="w-full h-full hover:text-gray-500 transition-colors flex p-4 items-center text-sm"
      >
        <p>{isHome ? '대시보드' : '홈으로'}</p>
      </Link>
    </div>
  );
}