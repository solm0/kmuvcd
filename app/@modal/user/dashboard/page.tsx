import { Metadata } from 'next';
import UserCard from '@/app/ui/auth/usercard';
import { getUserMe } from '@/app/lib/api/get-user-me';
import DashboardLayout from '@/app/ui/auth/dashboard-card';
import { LogoutForm } from '@/app/ui/auth/forms/logout-form';

export const metadata: Metadata = {
  title: '내 프로필',
};

export default async function Page() {
  const user = await getUserMe(true);

  return (
    <DashboardLayout userOk={user?.ok}>
      <UserCard user={user?.data} />
      <LogoutForm />
    </DashboardLayout>
  );
}