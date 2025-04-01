'use client'

import { PostProps } from "@/app/lib/types";
import { useState } from "react";
import { ImageMedia } from "../cms/media";
import Website from "../cms/website";
import clsx from "clsx";

export default function ProfessorTable({data}: {data:PostProps[]}) {
  const [professor, setProfessor] = useState('');
  
  const selectedProf = data.find((prof) => prof.name === professor)

  return (
    <div className="flex w-full gap-4">
      <table className="w-1/2 table-fixed">
        <tbody>
        {data.map((post: PostProps) => (
            <tr
                key={post.documentId}
                className={clsx('border-b border-black hover:bg-black hover:text-white', {"bg-black text-white": professor === post.name})}
                onClick={() => setProfessor(post.name || '')}
            >
                <td>{post.name}</td>
                <td className="pl-4 truncate">{post.position}</td>
            </tr>
        ))}
        </tbody>
      </table>

      {selectedProf &&
        <div className="w-1/2">
          {selectedProf.thumbnail &&
              <div>
                  <ImageMedia media={selectedProf.thumbnail} size='thumbnail' />
              </div>
          }
          <p>position: {selectedProf.position}</p>
          <p>education: {selectedProf.education}</p>
          <p>location: {selectedProf.location}</p>
          <p>phone: {selectedProf.phone}</p>
          <p>email: {selectedProf.email}</p>
          {selectedProf.website && selectedProf.website?.length > 0 && (
              <div>website:
                  {selectedProf.website?.map((website) => (
                      <Website key={website.id} website={website} />
                  ))}
              </div>
          )}
      </div>
      }
    </div>
  )
}