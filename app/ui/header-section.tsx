import { Search } from 'lucide-react';
import Link from 'next/link';

export default async function HeaderSection() {
  return (
    <section
      className="fixed bg-gray-200 w-screen h-16 flex z-20 border-b border-gray-400"
    >
      <div className="w-56 h-full border-l border-gray-400 p-4 flex items-center gap-4">
        <p className="break-keep">국민대학교 시각디자인학과</p>
      </div>
      <div className="w-56 border-l border-gray-400 p-4 flex items-center gap-4">
        <p>전체검색</p>
        <Search className='ml-auto' />
      </div>
      <div className="w-56 border-l border-gray-400 p-4 flex items-center">
        <p>중요 공지</p>
      </div>
      <div className="w-36 ml-auto border-l border-gray-400">
        <Link href='/dashboard' className='w-full h-full hover:bg-blue-500 transition-colors flex p-4 items-center'>
          <p>대시보드</p>
        </Link>
      </div>
    </section>
  );
}