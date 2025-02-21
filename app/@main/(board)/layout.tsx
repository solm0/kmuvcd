'use client'

import Link from "next/link";

export default function Layout({children}: {children: React.ReactNode}) {
  return(
    <div className="w-full">
      <div className="bg-gray-200 w-full h-12 p-4 flex items-center border-b border-gray-400 gap-4">
        <label>보기: </label>
        <Link href='/calendar' className="hover:text-gray-500">캘린더</Link>
        <Link href='/lists' className="hover:text-gray-500">리스트</Link>
        <Link href='/images' className="hover:text-gray-500">이미지</Link>
      </div>
      <div className="bg-gray-200 h-12 p-4 flex items-center border-b border-gray-400 gap-4">
        <label>카테고리: </label>
        <button className="hover:text-gray-500">전시</button>
        <button className="hover:text-gray-500">활동</button>
        <button className="hover:text-gray-500">이벤트</button>
        <button className="hover:text-gray-500">학사공지</button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}