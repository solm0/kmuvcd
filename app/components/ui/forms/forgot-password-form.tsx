'use client'

import { useState } from 'react';
import { ZodErrors } from '@/app/components/custom/zod-errors';
import { forgetPasswordAction } from '@/app/components/actions/auth-actions';
import { useActionState } from 'react';
import { StrapiErrors } from '@/app/components/custom/strapi-errors';
import { SubmitButton } from '@/app/components/custom/submit-button';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function ForgotPasswordForm() {
  const [formState, formAction] = useActionState(forgetPasswordAction, INITIAL_STATE);

  const [values, setValues] = useState({
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

    return (
      <div className='rounded-lg bg-gray-100 p-8'>
        <form
          className="flex flex-col gap-2 items-start"
          action={formAction}
        >
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="rounded-lg px-5 py-2"
            placeholder="username or email"
          />
          <ZodErrors error={formState?.zodErrors?.email} />

          <SubmitButton text="비밀번호 찾기" loadingText="Loading" />
          <StrapiErrors error={formState?.strapiErrors} />

        </form>
      </div>
    );
}