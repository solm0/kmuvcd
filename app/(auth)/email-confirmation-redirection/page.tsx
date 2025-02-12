import { Metadata } from 'next';
import { EmailConfirmationForm } from '@/app/ui/auth/forms/email-confirmation-form';

export const metadata: Metadata = {
    title: '이메일 인증 완료',
};

export default async function EmailConfirmationPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>이메일 인증 완료</h1>
        <p>
          <a href='/signin' className='underline hover:text-blue-800'>로그인하기</a>
        </p>
        <p>혹은 인증요청 메일 다시 받기</p>
        <EmailConfirmationForm />
      </div>
    );
}