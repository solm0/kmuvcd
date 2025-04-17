import { PostProps } from "@/app/lib/types";
import { ImageMedia } from "../cms/media";
import Website from "../cms/website";

export default function ProfCard ({prof}: {prof: PostProps}) {
  return (
    <div className="w-1/2">
      {prof.thumbnail &&
          <div>
              <ImageMedia media={prof.thumbnail} size='thumbnail' />
          </div>
      }
      <p>position: {prof.position}</p>
      <p>education: {prof.education}</p>
      <p>location: {prof.location}</p>
      <p>phone: {prof.phone}</p>
      <p>email: {prof.email}</p>
      {prof.website && prof.website?.length > 0 && (
          <div>website:
              {prof.website?.map((website) => (
                  <Website key={website.id} website={website} />
              ))}
          </div>
      )}
    </div>  
  )
}