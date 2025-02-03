import { Metadata } from 'next';
import { LogoutButton } from '@/app/components/custom/logout-button';
import UserCard from '@/app/components/usercard';

export const metadata: Metadata = {
    title: '내 프로필',
};

export default function Profile() {
  return (
    <div>
      <h1 className='text-2xl pb-8'>내 프로필</h1>
      <UserCard />
      <LogoutButton />
    </div>
  );
}