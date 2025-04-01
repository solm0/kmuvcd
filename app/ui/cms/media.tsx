import Image from "next/image";
import { MediaProps } from "@/app/lib/types";

export function ImageMedia({ media, size = "thumbnail" }: { media: MediaProps, size?: "small" | "medium" | "large" | "thumbnail" }) {
  const imageFormat = media.formats?.[size] || media.formats?.thumbnail;

  return (
    <Image
      src={imageFormat?.url || " "}
      width={imageFormat?.width}
      height={imageFormat?.height}
      alt={media.alternativeText || 'Image'}
    />
  );
}

// export function VideoMedia({ media }: { media: MediaProps }) {
//   return <video controls><source src={media.formats?.large.url} /></video>;
// }

// export function AudioMedia({ media }: { media: MediaProps }) {
//   return <audio controls><source src={media.formats.large.url} /></audio>;
// }