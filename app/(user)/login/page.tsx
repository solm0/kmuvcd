import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '로그인',
};

export default async function Page() {
    return (
      <div>
        <h1>로그인하세요.</h1>
        <p>회원이 아니라고요?
          <a href='/signin' className='underline hover:text-blue-800'>회원가입하세요.</a>
        </p>
      </div>
    );
}