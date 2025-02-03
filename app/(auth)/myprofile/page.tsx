import { Metadata } from 'next';
import { LogoutButton } from '@/app/components/custom/logout-button';

export const metadata: Metadata = {
    title: '내 프로필',
};

export default function Page() {
    return (
      <div>
        <h1>내 프로필</h1>
        <LogoutButton />
      </div>
    );
}