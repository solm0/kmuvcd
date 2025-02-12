"use server";

import { z } from 'zod';
import { registerUserService, loginUserService, forgetPasswordUserService, resetPasswordUserService, emailConfirmationUserService } from '@/app/lib/services/auth-service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(2).max(100, {
    message: "Username must be between 2 and 100 characters",
  }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine((email) => email.endsWith("@kookmin.ac.kr"), {
      message: "Only @kookmin.ac.kr emails are allowed",
    }),
  password: z.string().min(8).max(100, {
    message: "Password must be between 8 and 100 characters",
  }),
});

export async function registerUserAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {
  console.log("Hello From Register User Action");

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);
  
  redirect("/myprofile");
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(2, {
      message: "Identifier must have at least 2 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must have at least 8 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await loginUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  }

  // console.log(responseData, "responseData");

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);
  cookieStore.set("username", responseData.user.username, config);

  redirect("/myprofile");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  cookieStore.set("username", "", { ...config, maxAge: 0 });
  redirect("/");
}

const schemaForgotPassword = z.object({
  email: z
    .string()
    .min(2, {
      message: "email must have at least 2 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
});

export async function forgetPasswordAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {

  // Validate the email
  const validatedFields = schemaForgotPassword.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await forgetPasswordUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (!responseData.success) { // Check for failure with the success property
    return {
      ...prevState,
      zodErrors: null,
      message: responseData.message || "Failed to reset password.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: responseData.message || "Password reset email sent successfully!",
  };
}

const schemaResetPassword = z.object({
  code: z
    .string(),
  password: z
    .string()
    .min(8, {
      message: "Password must have at least 8 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
  passwordConfirmation: z
    .string()
    .min(8, {
      message: "Password must have at least 8 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function resetPasswordAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {
  const validatedFields = schemaResetPassword.safeParse({
    code: formData.get("code"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const responseData = await resetPasswordUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (!responseData.success) { // Check for failure with the success property
    return {
      ...prevState,
      zodErrors: null,
      message: responseData.message || "Failed to reset password.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: responseData.message || "Password reset email sent successfully!",
  };
}

const schemaEmailConfirmation = z.object({
  email: z
    .string()
    .min(2, {
      message: "email must have at least 2 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
});

export async function emailConfirmationAction(
  prevState: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  formData: FormData
) {

  // Validate the email
  const validatedFields = schemaEmailConfirmation.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Resend Email Confirmation.",
    };
  }

  const responseData = await emailConfirmationUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      zodErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (!responseData.success) { // Check for failure with the success property
    return {
      ...prevState,
      zodErrors: null,
      message: responseData.message || "Failed to resend email confirmation.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    message: responseData.message || "Email confirmation email sent successfully!",
  };
}