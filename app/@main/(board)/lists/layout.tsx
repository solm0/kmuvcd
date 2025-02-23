import CalendarEntry from "@/app/ui/calendar-entry";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";

export default async function Layout({children}: {children: React.ReactNode}) {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();
  
  return (
    <div className="w-full flex p-4 h-full gap-4">
      <div className="flex-1 overflow-x-auto">
        <CalendarEntry
          data={calendarEntries}
          token={token ?? undefined}
          user={user?.data}
        />
      </div>
      <div className="w-auto overflow-x-auto">
        {children}
      </div>
    </div>
  );
}