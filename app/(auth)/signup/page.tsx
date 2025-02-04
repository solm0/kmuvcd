import { Metadata } from 'next';
import { SignupForm } from '@/app/components/ui/forms/signup-form';

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
        <p>비밀번호를 잊어버렸나요?
          <a href='/forgot-password' className='underline hover:text-blue-800'>비밀번호 재설정하기</a>
        </p>
      </div>
    );
}