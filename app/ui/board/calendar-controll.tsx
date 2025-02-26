'use client'

import { useState } from "react";

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const format_day = day < 10 ? '0' + day : day;
const format_month = month < 10 ? '0' + month : month;
const format_today = `${year}-${format_month}-${format_day}`;

export function scrollToDay(
  first_to_targetday: number,
  columnWidth: number,
  ref:React.RefObject<HTMLDivElement | null>,
  scroll: boolean = true
) {
  const window = document.getElementById('calendar_window');

  if (ref.current && window?.offsetWidth) {
    const left = window?.offsetWidth * 0.5 - columnWidth / 2;
    const scrollTarget = first_to_targetday * columnWidth - left;

    ref.current.scrollTo({
      left: scrollTarget,
      behavior: scroll ? "smooth" : "instant",
    });
  }
}

export function GoToToday({
  first_date,
  columnWidth,
  calendarRef
} : {
  first_date: Date,
  columnWidth: number,
  calendarRef:React.RefObject<HTMLDivElement | null>
}) {
  const first_to_today = Math.floor((+today - +first_date) / (1000 * 60 * 60 * 24));
  console.log("first_date", first_date)

  return (
    <button
      className="flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors"
      onClick={() => {scrollToDay(first_to_today, columnWidth, calendarRef)}}
    >
      Today
    </button>
  )
}

export function GoToInputday({
  first_date,
  columnWidth,
  calendarRef,
  min,
  max
}: {
  first_date: Date,
  columnWidth: number,
  calendarRef:React.RefObject<HTMLDivElement | null>
  min:string,
  max:string
},
) {
  const [inputDay, setInputDay] = useState(format_today);

  const input_in_date = new Date(inputDay);
  const first_to_inputday = Math.floor((+input_in_date - +first_date) / (1000 * 60 * 60 * 24));

  const handleInputDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputDay(input);
  }

  return (
    <div className='rounded-lg bg-gray-100 p-8 my-4'>
      <form
        className="flex flex-col gap-2 items-start"
      >
        <label htmlFor="inputDay">Select a day</label>
        <input
          id="inputDay"
          type="date"
          name="inputDay"
          value={inputDay}
          min={min}
          max={max}
          onChange={handleInputDay}
        >
        </input>
      </form>
      <button
        type="submit"
        className="flex px-5 py-2 bg-neutral-950 text-white text-sm rounded-full hover:bg-neutral-700 transition-colors my-2"
        onClick={() => {scrollToDay(first_to_inputday, columnWidth, calendarRef)}}
      >
        Input Day
      </button>
    </div>
  )
}