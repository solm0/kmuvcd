import { Metadata } from 'next';
import { EmailConfirmationForm } from '@/app/ui/auth/forms/email-confirmation-form';

export const metadata: Metadata = {
    title: '인증요청 메일 재전송',
};

export default async function EmailConfirmationPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>인증요청 메일 재전송</h1>
        <p>인증요청 메일 다시 받기</p>
        <EmailConfirmationForm />
      </div>
    );
}