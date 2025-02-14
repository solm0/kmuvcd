import axios from 'axios';

interface RegisterUserProps {
  realname: string;
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

interface ForgetPasswordUserProps {
  email: string;
}

interface ResetPasswordUserProps {
  code: string;
  password: string;
  passwordConfirmation: string;
}

interface EmailConfirmationUserProps {
  email: string;
}

const baseUrl = "https://kmuvcd-strapi.onrender.com";

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

export async function forgetPasswordUserService(userData: ForgetPasswordUserProps) {
  const url = "https://kmuvcd-strapi.onrender.com/api/auth/forgot-password";

  try {
    const response = await axios.post(url, { email: userData.email });

    console.log("Your user received an email:", response.data);

    // Return a success message
    return {
      success: true,
      message: 'Check your email to reset your password.',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Forgot Password Axios Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Forgot Password General Error:", error.message);
    } else {
      console.error("An unknown error occurred");
    }

    // Return error message
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}

export async function resetPasswordUserService(userData: ResetPasswordUserProps) {
  const url = "https://kmuvcd-strapi.onrender.com/api/auth/reset-password";

  try {
    const response = await axios.post(url, {
      code: userData.code,
      password: userData.password,
      passwordConfirmation: userData.passwordConfirmation,
    });

    console.log("Your user reseted the password", response.data);

    // Return a success message
    return {
      success: true,
      message: 'Your password has been reset.',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Reset Password Axios Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Reset Password General Error:", error.message);
    } else {
      console.error("An unknown error occurred");
    }

    // Return error message
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}

export async function emailConfirmationUserService(userData: EmailConfirmationUserProps) {
  const url = "https://kmuvcd-strapi.onrender.com/api/auth/send-email-confirmation";

  try {
    const response = await axios.post(url, { email: userData.email });

    console.log("Your user received an email:", response.data);

    // Return a success message
    return {
      success: true,
      message: 'Check your email to reset your password.',
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Email Confirmation resend Axios Error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Email Confirmation resend General Error:", error.message);
    } else {
      console.error("An unknown error occurred");
    }

    // Return error message
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}