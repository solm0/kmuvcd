'use client'

import { useState } from "react";
import { PostProps } from "@/app/lib/types";
import clsx from "clsx";
import { useHoveredCourseStore } from "@/app/lib/store/useHoveredCourseStore";
import CrsCard from "./crs-card";

export default function CourseTable({data}: {data: PostProps[]}) {
  const [course, setCourse] = useState('');

  const selectedCourse = data.find((crs) => crs.name === course);

  const setHoveredCourse = useHoveredCourseStore((state) => state.setHoveredCourse);
  const hoverCourse = useHoveredCourseStore((state) => state.hoveredCourse);
  const hoveredCourse = data.find((crs) => crs.name === hoverCourse);

  let crs;

  if (hoveredCourse) {
    crs = hoveredCourse;
  } else {
    if (selectedCourse) {
      crs = selectedCourse;
    }
  }

  return (
    <div className="flex w-full gap-4">
      <table className="w-1/2">
        <thead className="text-left">
          <tr>
            <th>name</th>
            <th className="pl-4">credit</th>
            <th className="pl-4">grade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post: PostProps) => (
            <tr
                key={post.documentId}
                className={clsx('border-b border-black hover:bg-black hover:text-white', {"bg-black text-white": course === post.name})}
                onClick={() => setCourse(post.name || '')}
                onMouseEnter={() => setHoveredCourse(post.name || null)}
                onMouseLeave={() => setHoveredCourse(null)}
            >
                <td>{post.name}</td>
                <td className="pl-4">{post.credits}</td>
                <td className="pl-4">{post.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {crs && <CrsCard crs={crs} />}
    </div>
  )
}