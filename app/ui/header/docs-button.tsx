import Link from "next/link"

export default function DocsButton() {

  return (
      <div className="fixed w-28 h-8 transition-colors duration-300 hover:text-gray-400">
        <Link
          href="/"
          className='h-8 flex items-center gap-2 text-sm break-keep'
        >
          국민대학교 시각디자인학과
        </Link>
      </div>
  )
}