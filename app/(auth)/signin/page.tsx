import { Metadata } from 'next';
import { SigninForm } from '@/app/ui/auth/forms/signin-form';

export const metadata: Metadata = {
    title: '로그인',
};

export default async function SignInRoute() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>로그인</h1>
        <SigninForm />
        <p className="text-sm pt-4">회원가입을 아직 안했나요?
          <a href='/signup' className='underline hover:text-blue-600 pl-1'>회원가입 페이지로</a>
        </p>
        <p className="text-sm pt-4">비밀번호를 잊어버렸나요?
          <a href='/forgot-password' className='underline hover:text-blue-600 pl-1'>비밀번호 재설정하기</a>
        </p>
      </div>
    );
}