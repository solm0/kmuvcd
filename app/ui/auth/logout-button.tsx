'use client'

import { useFormStatus } from "react-dom";
import { LogOut, Loader2 } from "lucide-react";

function Loader({ text }: { readonly text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
}

export function LogoutButton() {
  const status = useFormStatus();

  return (
      <button
        type="submit"
        aria-disabled={status.pending}
        disabled={status.pending}
        className="flex px-5 py-2 bg-neutral-950 text-white text-sm hover:bg-neutral-700 transition-colors"
      >
        {status.pending ?
          <Loader text="Loading" />
        :
          <div className="flex flex-row items-center gap-2">
            <LogOut className="w-6 h-6 hover:text-primary" />로그아웃
          </div>
        }
      </button>
  );
}