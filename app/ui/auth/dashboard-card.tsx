'use client'

import { useSearchParams } from "next/navigation";
import { redirect } from 'next/navigation';

export default function DashboardLayout({children, userOk}: {children: React.ReactNode; userOk:boolean}) {
  const searchParams = useSearchParams();

  if (userOk === false) {
    console.log("Redirecting to signin...", userOk);
    redirect(`/user/signin?${searchParams.toString()}`);
  }

  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto">
        <h1 className='text-2xl pb-8'>내 프로필</h1>
        {children}
      </div>
    </div>
  )
}