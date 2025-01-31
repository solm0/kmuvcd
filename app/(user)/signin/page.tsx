import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '회원가입',
};

export default async function Page() {
    return (
      <div>
        <h1>회원가입하세요.</h1>
        <p>회원이라고요?
          <a href='/login' className='underline hover:text-blue-800'> 로그인하세요.</a>
        </p>
      </div>
    );
}