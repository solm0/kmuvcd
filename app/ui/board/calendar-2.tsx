import CalendarGrid from "./calendar-grid";
import { getCalendarEntries } from "@/app/lib/get-calendar-entries";
import { getUserMe } from "@/app/lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";

export default async function Calendar2() {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div>
      <h1 className="text-2xl pb-8">Calendar2</h1>
      <CalendarGrid
        calendarEntries={calendarEntries}
        token={token ?? undefined}
        user={user?.data}
      />
    </div>
  );
}