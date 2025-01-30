import { ImageMedia } from "./media";
import MdText from "./md-text";
import { ContentItem } from "@/app/types";

export default function Content({ content }: { content: ContentItem[] }) {
  return (
    <div>
      {content.map((item, index) => {
        switch (item.__component) {
          case "content.content":
            return <MdText key={index} markdown={item.text ?? ""} />;
          case "content.media":
            if (!item.media) return null; // Ensure media is defined

            return (
              <div key={index}>
                {Array.isArray(item.media)
                  ? item.media.map((mediaItem, mediaIndex) => (
                      mediaItem && (
                        <ImageMedia key={mediaIndex} media={mediaItem} size="medium" />
                      )
                    ))
                  : <ImageMedia key={index} media={item.media} size="medium" />}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}