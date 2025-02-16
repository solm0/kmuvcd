import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/app/ui/auth/forms/forgot-password-form';

export const metadata: Metadata = {
    title: '비밀번호 재설정',
};

export default async function ForgotPasswordPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>비밀번호 재설정</h1>
        <ForgotPasswordForm />
      </div>
    );
}