import { PostProps, UserDataProps } from "../../../lib/types";
import Filter from "../filter";
import BoardImage from "../gallery/board-image";
import DetailWindow from "../detail-window";
import clsx from 'clsx';
import { useIsOpen } from "@/app/lib/utils/use-is-open";

export default function GalleryLayout({children, posts, user}: {children: React.ReactNode; posts: PostProps[]; user: UserDataProps}) {
  const isOpen = useIsOpen();

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col md:flex-row", isOpen && "md:flex-col")}>
      <Filter login={user ? true : false} />
      <div className="w-full flex h-full">
        <div className="flex-1 overflow-x-auto p-4">
          <div className="w-full overflow-x-auto text-sm">{`필터링 결과 ${posts.length}건`}</div>
          <BoardImage
            data={posts}
          />
        </div>
        <DetailWindow>{children}</DetailWindow>
      </div>
    </div>
  );
}