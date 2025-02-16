import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '이메일 인증 완료',
};

export default async function EmailConfirmationPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>이메일 인증 완료!</h1>
        <p className='mb-2'>이메일 인증이 완료되었습니다. 가입을 축하합니다~!~!</p>
        <Link href='/signin' className="px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors">로그인 페이지로</Link>
      </div>
    );
}