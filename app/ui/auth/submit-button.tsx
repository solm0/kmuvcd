"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

export function SubmitButton({
  text,
  loadingText,
  loading,
}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  
  return (
    <button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className="flex px-5 py-2 bg-neutral-950 text-white text-sm hover:bg-neutral-700 transition-colors"
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </button>
  );
}