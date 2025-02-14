"use client";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { clsx } from 'clsx';

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

interface RegisterButtonProps {
  text: string;
  loadingText: string;
  loading?: boolean;
  strengthPass?: boolean;
}

export function RegisterButton({
  text,
  loadingText,
  loading,
  strengthPass
}: Readonly<RegisterButtonProps>) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={!strengthPass || status.pending || loading}
      className={clsx(
        "flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors",
        {
          "opacity-50 pointer-events-none": !strengthPass,
        },
      )}
    >
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </button>
  );
}