'use client'

import { PostProps } from "@/app/lib/types";
import { useState } from "react";
import clsx from "clsx";
import { useHoveredProfStore } from "@/app/lib/store/useHoveredProfStore";
import ProfCard from "./prof-card";

export default function ProfessorTable({data}: {data:PostProps[]}) {
  const [professor, setProfessor] = useState('');
  
  const selectedProf = data.find((prof) => prof.name === professor)

  const setHoveredProf = useHoveredProfStore((state) => state.setHoveredProf);
  const hoverProf = useHoveredProfStore((state) => state.hoveredProf);
  const hoveredProf = data.find((prof) => prof.name === hoverProf );

  let prof;

  if (hoveredProf) {
    prof = hoveredProf;
  } else {
    if (selectedProf) {
      prof = selectedProf;
    }
  }

  return (
    <div className="flex w-full gap-4">
      <table className="w-1/2 table-fixed">
        <tbody>
        {data.map((post: PostProps) => (
            <tr
                key={post.documentId}
                className={clsx('border-b border-black hover:bg-black hover:text-white', {"bg-black text-white": professor === post.name})}
                onClick={() => setProfessor(post.name || '')}
                onMouseEnter={() => setHoveredProf(post.name || null)}
                onMouseLeave={() => setHoveredProf(null)}
            >
                <td>{post.name}</td>
                <td className="pl-4 truncate">{post.position}</td>
            </tr>
        ))}
        </tbody>
      </table>
      
      {prof && <ProfCard prof={prof} /> }
    </div>
  )
}