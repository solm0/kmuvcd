"use client";

import { useState } from "react";
import { loginUserAction } from "../../../lib/api/auth-actions";
import { useActionState } from "react";
import { ZodErrors } from "../zod-errors";
import { StrapiErrors } from "../strapi-errors";
import { SubmitButton } from "../submit-button";
import { Eye, EyeOff } from "lucide-react";

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

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className='rounded-lg bg-gray-100 p-8'>
      <form
        className="flex flex-col gap-2 items-start"
        action={formAction}
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

        <label htmlFor="password">비밀번호</label>
        <div className="flex flex-row items-center gap-2">
          <input
            id="password"
            type={isVisible ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            className="rounded-lg px-5 py-2"
            placeholder="password"
            required
          />
          <button
              className="cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-gray-500 transition-colors"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              aria-controls="password"
            >
              {isVisible ? (
                <EyeOff size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </button>
        </div>
        <ZodErrors error={formState?.zodErrors?.password} />

        <SubmitButton text="로그인" loadingText="Loading" />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>
    </div>
  );
}