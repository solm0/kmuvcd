import { PostProps } from "@/app/lib/types";
import MdText from "../cms/md-text";

export default function CrsCard({crs}: {crs: PostProps}) {
  return (
    <div className="w-1/2">
        <p>subject: {crs.subject}</p>
        <p>format: {crs.format}</p>
        <MdText markdown={crs.text ?? " "} />
      </div>
  )
}