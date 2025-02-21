import CalendarGrid from "@/app/ui/calendar-grid";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";

// import CalendarEntry from "@/app/ui/calendar-entry";

export default async function Calendar2() {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div className="w-full">

      {/* test */}
      {/* <CalendarEntry
        data={calendarEntries}
        token={token ?? undefined}
        user={user?.data}
      /> */}

      <CalendarGrid
        calendarEntries={calendarEntries}
        token={token ?? undefined}
        user={user?.data}
      />
    </div>
  );
}