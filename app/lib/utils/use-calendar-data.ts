import { useEffect, useMemo } from "react";
import { PostProps } from "@/app/lib/types";
import { scrollToDay } from "@/app/ui/bulletin/calendar/calendar-controll";

export function useCalendarData(
  calendarEntries: PostProps[],
  filteredEntries: PostProps[],
  columnWidth: number,
  calendarRef: React.RefObject<HTMLDivElement | null>
) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  // 전체 범위 계산
  const first_date = useMemo(() => new Date(calendarEntries[0].startDate), [calendarEntries]);
  const last_date = useMemo(() => new Date(calendarEntries[calendarEntries.length - 1].endDate), [calendarEntries]);
  const day_count = useMemo(() => (+last_date - +first_date) / MS_PER_DAY, [first_date, last_date]);

  // today 위치 계산
  const today = new Date();
  const first_to_today = useMemo(() => Math.floor((+today - +first_date) / MS_PER_DAY), [first_date]);

  // entry들의 위치 계산
  const entries = useMemo(() => {
    return filteredEntries.map((entry) => ({
      start: Math.floor((+new Date(entry.startDate) - +first_date) / MS_PER_DAY) + 1,
      end: Math.floor((+new Date(entry.endDate) - +first_date) / MS_PER_DAY) + 1,
    }));
  }, [filteredEntries, first_date]);

  useEffect(() => {
    scrollToDay(first_to_today, columnWidth, calendarRef, false);
  }, [first_to_today, columnWidth, calendarRef]);

  return { entries, day_count, first_to_today };
}