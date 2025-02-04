'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmailConfirmationForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const confirmation = searchParams.get('confirmation');

    if (confirmation) {
      setStatus('success');

      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } else {
      setStatus('error');
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {status === 'loading' && <p>Processing email confirmation...</p>}
      {status === 'success' && (
        <p className="text-green-500">
          ✅ Your email has been confirmed! Redirecting to login...
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-500">
          ❌ Email confirmation failed. Please try again or contact support.
        </p>
      )}
    </div>
  );
}