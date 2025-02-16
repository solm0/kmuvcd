'use client'

import { useState } from 'react';
import { emailConfirmationAction } from '@/app/lib/actions/auth-actions';
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

export function EmailConfirmationForm() {
  const [formState, formAction] = useActionState(emailConfirmationAction, INITIAL_STATE);

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

          <SubmitButton text="인증요청 메일 재전송" loadingText="Loading" />
          <StrapiErrors error={formState?.strapiErrors} />

        </form>

        {emailIsSent && (
        <div>
          <p className="pt-4 text-sm">이메일 인증 요청 메일을 전송했습니다. 메일로 전송된 링크를 클릭해 인증해주세요.</p>
          <p className="text-sm text-red-700 pt-4">메일을 받지 못했나요?</p>
          <ul className="list-disc text-sm text-red-700 pl-4">
            <li>스팸함을 보세요.</li>
            <li>메일주소를 다시 확인하세요.</li>
            <li>관리자에게 문의하세요.</li>
          </ul>
        </div>
      )}
      </div>
    );
}