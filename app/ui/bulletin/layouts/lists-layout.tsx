import { PostProps, UserDataProps } from "../../../lib/types";
import Filter from "../filter/filter";
import BoardList from "../lists/board-list";
import DetailWindow from "../detail-window";
import RemoveFilter from "../remove-filter";

export default function ListsLayout({children, length, posts, user}: {children: React.ReactNode; length:number; posts: PostProps[]; user: UserDataProps}) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="w-full md:w-1/2 h-full overflow-x-auto pr-4 [&::-webkit-scrollbar]:w-4  [&::-webkit-scrollbar-thumb]:bg-gray-100">
        <div className="fixed w-full md:w-1/2 pr-8">
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
    </div>
  );
}