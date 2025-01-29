import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

export default function MdText({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
      {markdown}
    </ReactMarkdown>
  );
}