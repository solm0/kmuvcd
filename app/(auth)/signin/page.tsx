import { Metadata } from 'next';
import { SigninForm } from '@/app/ui/auth/forms/signin-form';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '로그인',
};

export default async function SignInRoute() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>로그인</h1>
        <SigninForm />
        <p className="text-sm pt-4">회원가입을 아직 안했나요?
          <Link href='/signup' className='underline hover:text-blue-600 pl-1'>회원가입 페이지로</Link>
        </p>
        <p className="text-sm pt-4">비밀번호를 잊어버렸나요?
          <Link href='/forgot-password' className='underline hover:text-blue-600 pl-1'>비밀번호 재설정하기</Link>
        </p>
      </div>
    );
}