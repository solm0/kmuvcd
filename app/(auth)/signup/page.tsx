import { Metadata } from 'next';
import { SignupForm } from '@/app/ui/auth/forms/signup-form';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '회원가입',
};

export default async function SignUpRoute() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>회원가입</h1>
        <SignupForm />
        <p className="text-sm pt-4">이미 회원가입을 했나요?
          <Link href='/signin' className='underline hover:text-blue-600 pl-1'>로그인 페이지로</Link>
        </p>
      </div>
    );
}