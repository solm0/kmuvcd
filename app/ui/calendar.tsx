// import { CalendarProps } from "@/app/lib/definitions";
import { getCalendarEntries } from "../lib/get-calendar-entries";
import { getUserMe } from "../lib/services/get-user-me";
import { getAuthToken } from "@/app/lib/services/get-token";
import CalendarEntry from "./calendar-entry";

export default async function Calendar() {
  const calendarEntries = await getCalendarEntries();
  const user = await getUserMe(true);
  const token = await getAuthToken();

  return (
    <div className="w-full">
      <h1 className="text-2xl pb-8">Calendar</h1>
      <CalendarEntry
        data={calendarEntries}
        token={token ?? undefined}
        user={user?.data}
      />
    </div>
  );
}