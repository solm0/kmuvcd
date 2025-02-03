"use client";

import { useState } from "react";

export function SigninForm() {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <div className='rounded-lg bg-gray-100 p-8'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
        <label htmlFor="email">이메일</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className="rounded-lg px-5 py-2"
        />
        <button type="submit" className="flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors">로그인</button>
      </form>
    </div>
  );
}