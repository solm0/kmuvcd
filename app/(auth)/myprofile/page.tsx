import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '내 프로필',
};

export default async function Page() {
    return (
      <div>
        <h1>내 프로필</h1>
      </div>
    );
}