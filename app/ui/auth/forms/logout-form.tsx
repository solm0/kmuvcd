'use client'

import { logoutAction } from '@/app/lib/api/auth-actions';
import { LogoutButton } from '@/app/ui/auth/logout-button';
import { useSearchParams } from 'next/navigation';

export function LogoutForm() {
  const searchParams = useSearchParams();

  const actionWithParams = async () => {
    await logoutAction(searchParams.toString());
  }

  return (
    <form action={actionWithParams}>
      <LogoutButton />
    </form>
  )
}