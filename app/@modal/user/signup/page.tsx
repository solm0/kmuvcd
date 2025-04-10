'use client'

import { useSearchParams } from "next/navigation";
import { SignupForm } from '@/app/ui/auth/forms/signup-form';
import { useRouter } from 'next/navigation';

export default function SignUpRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <h1 className='text-2xl pb-8'>회원가입</h1>
      <SignupForm />
      <p className="text-sm pt-4">이미 회원가입을 했나요?
        <button onClick={() => router.push(`/user/signin?${searchParams.toString()}`)} className='underline hover:text-blue-600 pl-1'>로그인 페이지로</button>
      </p>
    </div>
  );
}