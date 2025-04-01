'use client'

import { useState } from 'react';
import { forgotPasswordAction } from '@/app/lib/api/auth-actions';
import { useActionState } from 'react';
import { ZodErrors } from '@/app/ui/auth/zod-errors';
import { StrapiErrors } from '@/app/ui/auth/strapi-errors';
import { SubmitButton } from '@/app/ui/auth/submit-button';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function ForgotPasswordForm() {
  const [formState, formAction] = useActionState(forgotPasswordAction, INITIAL_STATE);

  const [values, setValues] = useState({
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const [emailIsSent, setEmailIsSent] = useState(false);

  const handleSubmit = () => {
    setEmailIsSent(true);
  }

  return (
    <div className='rounded-lg bg-gray-100 p-8'>
      <form
        className="flex flex-col gap-2 items-start"
        action={formAction}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">이메일</label>
        <p id="realname-description" className="text-sm text-gray-500">비밀번호 재설정 링크를 보내드릴게요~~</p>
        <div className="flex flex-row items-center gap-2">
          <input
            id="email"
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="rounded-lg px-5 py-2"
            placeholder="email"
            required
          />
          <span>@kookmin.ac.kr</span>
        </div>
        <ZodErrors error={formState?.zodErrors?.email} />

        <SubmitButton text="확인" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>

      {emailIsSent && (
        <div>
          <p className="pt-4 text-sm">&#40;당신이 입력한 메일이 계정이 존재하는 메일이라면&#41; 비밀번호 재설정 메일을 전송했습니다. 링크를 클릭해 재설정해주세요.</p>
        </div>
      )}
    </div>
  );
}