import { Metadata } from 'next';
import { ForgotPasswordForm } from '@/app/components/ui/forms/forgot-password-form';

export const metadata: Metadata = {
    title: '비밀번호 재설정 메일 보내기',
};

export default async function ForgotPasswordPage() {
    return (
      <div>
        <h1 className='text-2xl pb-8'>비밀번호 재설정 메일 보내기</h1>
        <ForgotPasswordForm />
      </div>
    );
}