import { usePathname, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function AnimatedContainer({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isCleanPath = pathname === "/";

  const generateHref = (searchParams: string) => {
    return `/?${searchParams}`;
  }

  return (
      <div className={clsx("absolute right-0 top-0 bg-white w-1/2 h-full", {"hidden": isCleanPath})}>
        <div className="h-12 p-4 flex absolute w-full items-center">
          <Link
            href={generateHref(searchParams.toString())}
            className="ml-auto text-gray-600 hover:text-gray-900 z-30 transition-colors"
          >
            <X />
          </Link>
        </div>
        <div>
          {children}
        </div>
      </div>
  );
}