'use client'

import { SigninForm } from '@/app/ui/auth/forms/signin-form';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

export default function SignInRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <h1 className='text-2xl pb-8'>로그인</h1>
      <SigninForm />
      <p className="text-sm pt-4">회원가입을 아직 안했나요?
        <button onClick={() => router.push(`/user/signup?${searchParams.toString()}`)} className='underline hover:text-blue-600 pl-1'>회원가입 페이지로</button>
      </p>
      <p className="text-sm pt-4">비밀번호를 잊어버렸나요?
        <button onClick={() => router.push(`/user/forgot-password?${searchParams.toString()}`)} className='underline hover:text-blue-600 pl-1'>비밀번호 재설정하기</button>
      </p>
    </div>
  );
}