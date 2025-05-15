import { PostProps, UserDataProps } from "../../../lib/types";
import Filter from "../filter/filter";
import BoardList from "../lists/board-list";
import DetailWindow from "../detail-window";
import RemoveFilter from "../remove-filter";
import { Calendar } from 'lucide-react';

export default function ListsLayout({children, length, posts, user}: {children: React.ReactNode; length:number; posts: PostProps[]; user: UserDataProps}) {
  return (
      <div className="flex-1 overflow-y-hidden flex gap-4 w-auto flex-shrink">
        <div className="w-full md:w-96 h-full overflow-y-auto [&::-webkit-scrollbar]:w-4  [&::-webkit-scrollbar-thumb]:bg-gray-100">
          <div className="fixed w-full md:w-96 pr-8">
            <Filter login={user ? true : false} />
            <RemoveFilter length={length} />
          </div>
          <table className="text-left w-full text-sm mt-72">
            <thead>
              <tr className="h-12">
                <th className="w-28">태그</th>
                <th>제목</th>
              </tr>
            </thead>
            <tbody>
              <BoardList
                data={posts}
              />
            </tbody>
          </table>
        </div>

        <DetailWindow>{children}</DetailWindow>
      
      <div className="absolute right-4 w-8 h-8 flex items-center justify-center">
        <Calendar className="w-5 h-5" />
      </div>
    </div>
  );
}