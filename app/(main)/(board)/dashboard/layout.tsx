import { Metadata } from 'next';
import { LogoutButton } from '@/app/ui/auth/logout-button';
import UserCard from '@/app/ui/auth/usercard';
import { getBoardPosts } from "@/app/lib/get-board-posts";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import AnimatedContainer from "@/app/ui/board/animated-container";
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/lib/actions/auth-actions';

export const metadata: Metadata = {
  title: '내 프로필',
};

export default async function Layout({children}: {children: React.ReactNode}) {
  const token = await getAuthToken();
  const user = await getUserMe(true);
  const posts = await getBoardPosts();

  if (user?.ok === false) {
    console.log("Redirecting to signin...", user);
    redirect("/signin");
  }

  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto">
        <h1 className='text-2xl pb-8'>내 프로필</h1>
        <UserCard data={posts} token={token ?? undefined} user={user?.data} />
        <form action={logoutAction}>
          <LogoutButton />
        </form>
      </div>
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}