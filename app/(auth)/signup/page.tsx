import { Metadata } from 'next';
import { SignupForm } from '@/app/ui/auth/forms/signup-form';

export const metadata: Metadata = {
    title: '회원가입',
};

export default async function SignUpRoute() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>회원가입</h1>
        <SignupForm />
        <p>회원이라고요?
          <a href='/signin' className='underline hover:text-blue-800'>로그인하세요.</a>
        </p>
      </div>
    );
}