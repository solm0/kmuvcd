"use client";

import { useState } from "react";
import { loginUserAction } from "../../actions/auth-actions";
import { useActionState } from "react";
import { ZodErrors } from "../../custom/zod-errors";
import { StrapiErrors } from "../../custom/strapi-errors";
import { SubmitButton } from "../../custom/submit-button";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

export function SigninForm() {
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE);

  const [values, setValues] = useState({
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
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <ZodErrors error={formState?.zodErrors?.email} />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <ZodErrors error={formState?.zodErrors?.password} />

        <SubmitButton text="로그인" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </div>
  );
}