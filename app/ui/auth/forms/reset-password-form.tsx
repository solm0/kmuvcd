'use client'

import { useState, useEffect } from 'react';
import { ZodErrors } from '@/app/ui/auth/zod-errors';
import { resetPasswordAction } from '@/app/lib/actions/auth-actions';
import { useActionState } from 'react';
import { StrapiErrors } from '@/app/ui/auth/strapi-errors';
import { SubmitButton } from '@/app/ui/auth/submit-button';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  message: null,
};

export function ResetPasswordForm() {
  const [values, setValues] = useState({
    code: "",
    password: "",
    passwordConfirmation: "",
  });

  // Ensure this runs only in the browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search); // Get search params directly
      const codeFromQuery = searchParams.get('code'); // Extract the `code` parameter
      setValues((prevValues) => ({
        ...prevValues,
        code: codeFromQuery || "",  // Set the code if it's available in the URL
      }));
    }
  }, []);

  const [formState, formAction] = useActionState(resetPasswordAction, INITIAL_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className='rounded-lg bg-gray-100 p-8'>
      <form
        className="flex flex-col gap-2 items-start"
        action={formAction}
      >
        <label htmlFor="code">Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={values.code}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
          placeholder="Code"
        />
        <ZodErrors error={formState?.zodErrors?.code} />

        <label htmlFor="password">새 비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
          placeholder="New password"
        />
        <ZodErrors error={formState?.zodErrors?.password} />

        <label htmlFor="passwordConfirmation">새 비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
          placeholder="Confirm new password"
        />
        <ZodErrors error={formState?.zodErrors?.passwordConfirmation} />

        <SubmitButton text="비밀번호 재설정" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </div>
  );
}