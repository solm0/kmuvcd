import { Metadata } from 'next';
import { LogoutButton } from '@/app/components/custom/logout-button';
import UserCard from '@/app/components/ui/usercard';
import { getAuthToken } from '@/app/data/services/get-token';

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