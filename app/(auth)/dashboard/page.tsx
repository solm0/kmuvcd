import { Metadata } from 'next';
import { LogoutButton } from '@/app/ui/auth/logout-button';
import UserCard from '@/app/ui/auth/usercard';
import { getAuthToken } from '@/app/lib/services/get-token';
import { getUserMe } from '@/app/lib/services/get-user-me';
import { redirect } from 'next/navigation';
import { logoutAction } from "../../lib/actions/auth-actions";

export const metadata: Metadata = {
    title: '내 프로필',
};

export default async function Profile() {
  const token = await getAuthToken();
  const user = await getUserMe(true);

  if (user?.ok === false) {
    console.log("Redirecting to signin...");
    redirect("/signin");
  }

  return (
    <div>
      <h1 className='text-2xl pb-8'>내 프로필</h1>
      <UserCard token={token ?? undefined} user={user?.data} />
      <form action={logoutAction}>
        <LogoutButton />
      </form>
    </div>
  );
}