import { Metadata } from 'next';
import { ResetPasswordForm } from '@/app/components/ui/forms/reset-password-form';

export const metadata: Metadata = {
    title: '비밀번호 재설정',
};

export default async function ResetPasswordPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>비밀번호 재설정</h1>
        <ResetPasswordForm />
      </div>
    );
}