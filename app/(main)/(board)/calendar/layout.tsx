import CalendarGrid from "@/app/ui/board/calendar-grid";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import AnimatedContainer from "@/app/ui/docs/animated-container";

export default async function Layout({children}: {children: React.ReactNode}) {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div className="w-full flex h-full">
      <div className="flex-1 overflow-x-auto">
        <CalendarGrid
          calendarEntries={calendarEntries}
          token={token ?? undefined}
          user={user?.data}
        />
      </div>
      <AnimatedContainer>{children}</AnimatedContainer>
    </div>
  );
}