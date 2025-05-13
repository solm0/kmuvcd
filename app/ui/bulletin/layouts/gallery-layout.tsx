import { PostProps, UserDataProps } from "../../../lib/types";
import Filter from "../filter/filter";
import BoardImage from "../gallery/board-image";
import DetailWindow from "../detail-window";
import clsx from 'clsx';
import { useIsOpen } from "@/app/lib/utils/use-is-open";
import RemoveFilter from "../remove-filter";

export default function GalleryLayout({children, length, posts, user}: {children: React.ReactNode; length:number; posts: PostProps[]; user: UserDataProps}) {
  const isOpen = useIsOpen();

  return (
    <div className={clsx("flex-1 overflow-hidden flex flex-col")}>
      <div className={clsx(
        "w-full md:w-1/2 flex h-full overflow-x-auto",
        isOpen && '!w-full'
      )}>
        <div className="fixed w-full">
          <Filter login={user ? true : false} />
          <RemoveFilter length={length} />
        </div>
        <div className="flex-1 overflow-x-auto pr-4 mt-72">
          <BoardImage
            data={posts}
          />
        </div>
        <DetailWindow>{children}</DetailWindow>
      </div>
    </div>
  );
}