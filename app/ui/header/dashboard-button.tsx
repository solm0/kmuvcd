'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";
import clsx from "clsx";

export default function DashboardButton() {
  const pathname = usePathname();
  const isHome = !['/dashboard', '/email.confirmation', '/email-confirmation-resend', '/forgot-password', '/reset-password', '/signin', '/signup'].some(path => pathname.startsWith(path));

  return (
    <div className="fixed w-8 h-8 right-4">
      <Link
        href={isHome ? '/dashboard' : '/'}
        className={clsx("w-full h-full flex items-center justify-center rounded-full bg-gray-200 hover:text-gray-400 transition-colors", !isHome && "bg-gray-900 text-gray-100")}
      >
        <UserRound className="w-[20px] h-[20px]" />
      </Link>
    </div>
  );
}