'use client'

import { useState } from "react";
import { PostProps } from "../lib/definitions";
import MdText from "./cms/md-text";
import clsx from "clsx";

export default function CourseTable({data}: {data: PostProps[]}) {
  const [course, setCourse] = useState('');

  const selectedCourse = data.find((crs) => crs.name === course)

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
            >
                <td>{post.name}</td>
                <td className="pl-4">{post.credits}</td>
                <td className="pl-4">{post.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCourse &&
        <div className="w-1/2">
          <p>subject: {selectedCourse.subject}</p>
          <p>format: {selectedCourse.format}</p>
          <MdText markdown={selectedCourse.text ?? " "} />
        </div>
      }
    </div>
  )
}