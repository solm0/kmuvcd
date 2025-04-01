"use client";

import { useState, useMemo } from "react";
import { registerUserAction } from '@/app/lib/api/auth-actions';
import { useActionState } from "react";
import { ZodErrors } from "../zod-errors";
import { StrapiErrors } from "../strapi-errors";
import { RegisterButton } from "../register-button";
import { Check, X, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const INITIAL_STATE = {
  data: null,
};

export function SignupForm() {
  const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);

  const [values, setValues] = useState({
    realname: "",
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
        <label htmlFor="realname">이름</label>
        <p id="realname-description" className="text-sm text-gray-500">ON국민 포털에 가입된 이름을 입력해주세요</p>
        <input
          type="text"
          name="realname"
          id="realname"
          aria-describedby="realname-description"
          value={values.realname}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
          placeholder="realname"
          required
        />
        <ZodErrors error={formState?.zodErrors?.realname} />

        <label htmlFor="email">이메일</label>
        <p id="email-description" className="text-sm text-gray-500">국민대학교 메일을 입력해주세요</p>
        <div className="flex flex-row items-center gap-2">
          <input
            id="email"
            type="text"
            name="email"
            aria-describedby="email-description"
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
            aria-label="Password"
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
            <li key={`${req}-${index}`} className="flex items-center space-x-2">
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
        
        <RegisterButton
          text="회원가입"
          loadingText="Loading"
          strengthPass={strengthScore >= 3}
        />
        <StrapiErrors error={formState?.strapiErrors} />
      </form>

      {emailIsSent && (
        <div>
          <p className="pt-4 text-sm">이메일 인증 요청 메일을 전송했습니다. 메일로 전송된 링크를 클릭해 인증해주세요.</p>
          <p className="text-sm text-red-700 pt-4">메일을 받지 못했나요?</p>
          <ul className="list-disc text-sm text-red-700 pl-4">
            <li>스팸함을 보세요.</li>
            <li>메일주소를 다시 확인하세요.</li>
            <li>
              <Link href="/email-confirmation-resend" className="underline hover:text-red-500">
                재전송하세요.
              </Link>
            </li>
            <li>관리자에게 문의하세요.</li>
          </ul>
        </div>
      )}
    </div>
  );
}