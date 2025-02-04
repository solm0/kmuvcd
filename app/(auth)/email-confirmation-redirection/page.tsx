import { Metadata } from 'next';
import EmailConfirmationForm from '@/app/components/ui/forms/email-confirmation-form';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: '이메일 인증 완료',
};

export default async function EmailConfirmationPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>이메일 인증 완료</h1>
        <Suspense>
          <EmailConfirmationForm />
        </Suspense>
      </div>
    );
}