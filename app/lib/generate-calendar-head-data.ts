/* eslint-disable prefer-const */

export default function generateCalendarHeadData(firstDate: Date, lastDate: Date) {
  let current = firstDate;
  const end= lastDate;

  const calendar = {
    years: new Map(),
  };

  while (current <= end) {
    const year = current.getFullYear();
    const month = current.getMonth();
    const date = current.getDate();

    if (!calendar.years.has(year)) {
      calendar.years.set(year, { months: new Map() });
    }
    if (!calendar.years.get(year).months.has(month)) {
      calendar.years.get(year).months.set(month, { dates: [] });
    }

    calendar.years.get(year).months.get(month).dates.push(date);
    current.setDate(current.getDate() + 1);
  }

  return calendar;
}