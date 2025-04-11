'use client'

import { usePathname } from "next/navigation";

export default function ModalWrapper({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const isModalPath = pathname.startsWith('/user/');

  return (
    isModalPath && <div>{children}</div>
  )
}