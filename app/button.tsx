import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
}

export default function Button({text, href}: ButtonProps) {
  return (
    <Link
      className="rounded-full border border-solid border-black/[.08] transition-colors flex items-center justify-center hover:bg-[#f2f2f2]  hover:border-transparent text-sm sm:text-base h-10 sm:h-10 px-4 sm:px-5 sm:min-w-40"
      href={ href }
    >
      {text}
    </Link>
  )
}