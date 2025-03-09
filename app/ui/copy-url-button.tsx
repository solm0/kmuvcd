'use client'

import { useState } from 'react';
import { Link } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function CopyURLButton ({url}: {url: string}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const fullUrl = `${window.location.origin}${pathname}?${searchParams.toString()}#${url}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("failed to copy", err);
    }
  };

  return (
      <button onClick={handleCopy} className='text-gray-400 hover:text-gray-800'>
          {copied ? "Copied!" : <Link className='w-5 h-5' />}
      </button>
  )
}