import { Metadata } from 'next';
import { LogoutButton } from '@/app/ui/auth/logout-button';
import UserCard from '@/app/ui/auth/usercard';
import { getAuthToken } from '@/app/lib/services/get-token';

export const metadata: Metadata = {
    title: '내 프로필',
};

export default async function Profile() {
  const token = await getAuthToken();

  return (
    <div>
      <h1 className='text-2xl pb-8'>내 프로필</h1>
      <UserCard token={token ?? undefined} />
      <LogoutButton />
    </div>
  );
}