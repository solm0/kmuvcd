import { Metadata } from 'next';
import CalendarGrid from "@/app/ui/calendar-grid";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";

export const metadata: Metadata = {
  title: 'Board',
};

export default async function Calendar2() {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div className="p-4">
      뭔가가 계속 업데이트되는 곳. + Default of @main
      <CalendarGrid
        calendarEntries={calendarEntries}
        token={token ?? undefined}
        user={user?.data}
      />
    </div>
  );
}