'use client'

import clsx from "clsx"
import { useHoveredRoomStore } from "@/app/lib/store/useHoveredRoomStore"
import { useState } from "react";
import { rooms } from "@/app/lib/data/rooms";
import Link from "next/link";

export default function Map() {
  const hoveredRoom = useHoveredRoomStore((state) => state.hoveredRoom);
  const setHoveredRoom = useHoveredRoomStore((state) => state.setHoveredRoom);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0});

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const polygon = (room:{id: string; n: string; title: string; d: string; href?: string | undefined}) => {
    return (
      <path
        key={room.id}
        onMouseEnter={() => setHoveredRoom(room.id)}
        onMouseLeave={() => setHoveredRoom(null)}
        fill={ hoveredRoom === room.id ? "#0000ff" : room.href ? "#ededed" : "#ffffff"
        }
        d={room.d}
      >
      </path>
    )
  }

  const content = (room:{id: string; n: string; title: string; d: string; href?: string | undefined}) => {
    return (
      <li
        key={room.id}
        onMouseEnter={() => setHoveredRoom(room.id)}
        onMouseLeave={() => setHoveredRoom(null)}
        className={clsx("text-base hover:text-gray-100", hoveredRoom === room.id ? "bg-[#0000ff] text-gray-100" : "text-black")}
      >
        {room.title}
        {room.href && <span>*</span>}
      </li>
    )
  };

  return (
   <div
    onMouseMove={handleMouseMove}
   >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6587.86 2167.71">
      <polygon
        fill="#d3d3d3"
        points="0 140.24 0 968.38 2087.88 968.38 2988.63 1869.13 4991.46 1869.13 4991.46 2167.71 5295.63 2167.71 5295.63 1869.42 6587.86 1869.42 6587.86 1040.31 3390.15 1040.31 3390.15 986.34 3314.26 954.58 3274.37 996.06 2278.32 0 2019.74 0 2019.74 137.67 0 140.24"
      />
      {rooms.map((room) => (
        room.href ? (
          <Link key={room.id} href={room.href} className="w-auto h-auto">
            {polygon(room)}
          </Link>
        ) : (
          <>
            {polygon(room)}
          </>
        )
      ))}
    </svg>
    {hoveredRoom && rooms.find(room => room.id === hoveredRoom)?.href &&
      <div
        className="fixed z-80 h-auto w-36 flex items-center px-4 py-3 bg-gray-200 text-sm top-0 left-0 rounded-lg"
        style={{
          position: 'fixed',
          top: mousePos.y - 60,
          left: mousePos.x + 10,
          cursor: "none"
        }}
      >
        {rooms.find(room => room.id === hoveredRoom)?.title}에 대해 더 알아보려면 클릭
      </div>
    }
      <ul className="w-full h-36 flex flex-col flex-wrap">
        {rooms.map((room) => (
          room.href ? (
            <Link key={room.id} href={room.href} className="w-auto h-auto">
              {content(room)}
            </Link>
          ) : (
            <>
              {content(room)}
            </>
          )
        ))}
      </ul>
   </div>
  )
}