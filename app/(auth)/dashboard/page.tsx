import { Metadata } from 'next';
import { LogoutButton } from '@/app/ui/auth/logout-button';
import UserCard from '@/app/ui/auth/usercard';
import { getUserMe } from "@/app/lib/services/get-user-me";
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/lib/actions/auth-actions';

export const metadata: Metadata = {
  title: '내 프로필',
};

export default async function Page() {
  const user = await getUserMe(true);

  if (user?.ok === false) {
    console.log("Redirecting to signin...", user);
    redirect("/signin");
  }

  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto">
        <h1 className='text-2xl pb-8'>내 프로필</h1>
        <UserCard user={user?.data} />
        <form action={logoutAction}>
          <LogoutButton />
        </form>
      </div>
    </div>
  );
}