"use client";

import { useState } from "react";
import { registerUserAction } from '@/app/components/actions/auth-actions';
import { useActionState } from "react";
import { ZodErrors } from "../../custom/zod-errors";
import { StrapiErrors } from "../../custom/strapi-errors";
import { SubmitButton } from "../../custom/submit-button";

const INITIAL_STATE = {
  data: null,
};

export function SignupForm() {
  const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
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
        <label htmlFor="username">이름</label>
        <input
          type="text"
          name="username"
          id="username"
          value={values.username}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <ZodErrors error={formState?.zodErrors?.username} />

        <label htmlFor="email">이메일</label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <ZodErrors error={formState?.zodErrors?.email} />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <ZodErrors error={formState?.zodErrors?.password} />
        
        <SubmitButton text="회원가입" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </div>
  );
}