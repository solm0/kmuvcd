import Link from 'next/link';
import DashboardButton from './dashboard-button';

export default async function HeaderSection() {
  return (
    <section
      className="fixed bg-gray-200 w-screen h-12 flex z-20 border-b border-gray-400"
    >
      <div className="w-56 h-full border-l border-gray-400 flex items-center gap-4">
        <Link href='/' className='w-full h-full hover:bg-blue-500 transition-colors flex p-4 items-center'>
          <p className="break-keep">국민대학교 시각디자인학과</p>
        </Link>
      </div>
      <div className="w-36 ml-auto border-l border-gray-400">
        <DashboardButton />
      </div>
    </section>
  );
}