'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [router])

  const handleCloseModal = () => {
    const previous = sessionStorage.getItem('previousUrl') || '/';
    router.push(previous);
  }

  return(
    <Suspense>
      <div
        className="fixed inset-0 bg-black/20 p-4 flex items-center justify-center z-50"
        onClick={handleCloseModal}
      >
        <dialog
          open
          className="w-[44rem] h-[32rem] bg-white p-4"
          onClick={e => e.stopPropagation()}
        >
          {children}
        </dialog>
      </div>
    </Suspense>
  );
}