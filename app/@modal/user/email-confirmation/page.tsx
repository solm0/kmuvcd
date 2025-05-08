'use client'

import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

export default function EmailConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <h1 className='text-2xl pb-8'>이메일 인증 완료!</h1>
      <p className='mb-2'>이메일 인증이 완료되었습니다. 가입을 축하합니다~!~!</p>
      <button onClick={() => router.push(`/user/signin?${searchParams.toString()}`)} className="px-5 py-2 bg-neutral-950 text-white text-sm hover:bg-neutral-700 transition-colors">로그인 페이지로</button>
    </div>
  );
}