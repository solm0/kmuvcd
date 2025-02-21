import Link from "next/link";
import Categories from "@/app/ui/categories";
import Calendar2 from "../ui/calendar-2";

export default function Default() {

  return(
    <div className="w-full h-full flex flex-col">
      <nav className="h-auto">
        <div className="bg-gray-200 w-full h-12 p-4 flex items-center border-b border-gray-400 gap-4">
          <label>보기: </label>
          <Link href='/calendar' className="text-gray-500 hover:text-gray-500">
            캘린더
          </Link>
          <Link href='/lists' className="hover:text-gray-500">
            리스트
          </Link>
          <Link href='/images' className="hover:text-gray-500">
            이미지
          </Link>
        </div>
        <Categories />
      </nav>
      
      <div className="p-4 flex-1 overflow-auto">
        <div className="w-full">
          Default of @main
          <Calendar2 />
        </div>
      </div>
    </div>
  );
}