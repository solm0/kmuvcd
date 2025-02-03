import { Metadata } from 'next';
import { SigninForm } from '@/app/components/ui/forms/signin-form';

export const metadata: Metadata = {
    title: '로그인',
};

export default async function SignInRoute() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>로그인</h1>
        <SigninForm />
        <p>회원이 아니라고요?
          <a href='/signup' className='underline hover:text-blue-800'>회원가입하세요.</a>
        </p>
      </div>
    );
}