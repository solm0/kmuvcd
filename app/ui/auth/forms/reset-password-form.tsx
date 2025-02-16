'use client'

import { useState, useEffect, useMemo } from 'react';
import { resetPasswordAction } from '@/app/lib/actions/auth-actions';
import { useActionState } from 'react';
import { ZodErrors } from '@/app/ui/auth/zod-errors';
import { StrapiErrors } from '@/app/ui/auth/strapi-errors';
import { RegisterButton } from '../register-button';
import { Check, X, Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
import clsx from 'clsx';

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  message: null,
};

export function ResetPasswordForm() {
  const [formState, formAction] = useActionState(resetPasswordAction, INITIAL_STATE);
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  const [isEqual, setIsEqual] = useState<boolean | null>(null);

  const handleConfirmation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setIsEqual(value === values.password);
  }

  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const toggleVisibility = (field: string) => {
    setIsVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z, A-Z]/, text: "At least 1 letter" },
      { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
    ];
  
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(values.password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-gray-200";
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score <= 3) return "Medium password";
    return "Strong password";
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  }

  return (
    <div className='rounded-lg bg-gray-100 p-8'>
      <form
        className="flex flex-col gap-2 items-start"
        action={formAction}
        onSubmit={handleSubmit}
      >
        <div className='hidden'>
          <label htmlFor="code">Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={values.code}
            onChange={handleChange}
            className="rounded-lg px-5 py-2"
            placeholder="Code"
            required
          />
          <ZodErrors error={formState?.zodErrors?.code} />
        </div>

        <label htmlFor="password">새 비밀번호</label>
        <div className="flex flex-row items-center gap-2">
          <input
            id="password"
            type={isVisible["password"] ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange}
            className="rounded-lg px-5 py-2"
            placeholder="New password"
            aria-label="Password"
            required
          />
          <button
            className="cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-gray-500 transition-colors"
            type="button"
            onClick={() => toggleVisibility("password")}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible["password"]}
            aria-controls="password"
          >
            {isVisible["password"] ? (
              <EyeOff size={20} aria-hidden="true" />
            ) : (
              <Eye size={20} aria-hidden="true" />
            )}
          </button>
        </div>
        <div
          className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mb-4"
          role="progressbar"
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={5}
          aria-label="Password strength"
        >
          <div
            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
            style={{ width: `${(strengthScore / 4) * 100}%` }}
          ></div>
        </div>

        <p
          id="password-strength"
          className="text-sm font-medium text-gray-700 mb-2"
        >
          {getStrengthText(strengthScore)}.
        </p>

        {/* Password requirements list */}
        <ul className="space-y-1" aria-label="Password requirements">
          {strength.map((req, index) => (
            <li key={index} className="flex items-center space-x-2">
              {req.met ? (
                <Check
                  size={16}
                  className="text-emerald-500"
                  aria-hidden="true"
                />
              ) : (
                <X size={16} className="text-gray-400" aria-hidden="true" />
              )}
              <span
                className={`text-xs ${req.met ? "text-emerald-600" : "text-gray-500"}`}
              >
                {req.text}
                <span className="sr-only">
                  {req.met ? " - Requirement met" : " - Requirement not met"}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <ZodErrors error={formState?.zodErrors?.password} />

        <label htmlFor="passwordConfirmation">새 비밀번호 확인</label>
        <div className="flex flex-row items-center gap-2">
          <input
            id="passwordConfirmation"
            type={isVisible["passwordConfirmation"] ? 'text' : 'password'}
            name="passwordConfirmation"
            value={values.passwordConfirmation}
            onChange={handleChange}
            onKeyUp={handleConfirmation}
            className={clsx (
              "rounded-lg px-5 py-2 focus:outline-none focus-visible:outline-none",
              {
                "border-2 border-red-500": (isEqual === false),
              },
              {
                "border-2 border-green-500": (isEqual === true),
              }
            )}
            placeholder="Confirm new password"
            required
          />
          <button
            className="cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-gray-500 transition-colors"
            type="button"
            onClick={() => toggleVisibility("passwordConfirmation")}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible["passwordConfirmation"]}
            aria-controls="password"
          >
            {isVisible["passwordConfirmation"] ? (
              <EyeOff size={20} aria-hidden="true" />
            ) : (
              <Eye size={20} aria-hidden="true" />
            )}
          </button>
        </div>
        <ZodErrors error={formState?.zodErrors?.passwordConfirmation} />

        <RegisterButton
          text="비밀번호 재설정"
          loadingText="Loading"
          strengthPass={strengthScore >= 3}
          passwordConfirmation={isEqual}
        />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>

      {isSubmitted && (
        <div>
          <p className="pt-4 text-sm">
            비밀번호가 재설정됐습니다.
            <Link href="/signin" className='underline hover:text-blue-600 pl-1'>로그인 페이지로</Link>
          </p>
        </div>
      )}
    </div>
  );
}