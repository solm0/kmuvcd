import { Metadata } from 'next';
import { EmailConfirmationForm } from '@/app/ui/auth/forms/email-confirmation-form';

export const metadata: Metadata = {
    title: '이메일 인증',
};

export default async function EmailConfirmationPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>이메일 인증</h1>
        <p>인증요청 메일 다시 받기</p>
        <EmailConfirmationForm />
      </div>
    );
}