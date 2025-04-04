'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [router])

  return(
    <div
      className="fixed inset-0 bg-black/20 p-4 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <dialog
        open
        className="w-[44rem] h-[32rem] bg-white p-4"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
}