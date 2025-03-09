import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";

export default function MdText({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h3: ({ ...props }) => <h3 className="text-md font-bold my-4" {...props} />,
        p: ({ ...props }) => <p className="text-gray-700 leading-relaxed my-2 max-w-96" {...props} />,
        ul: ({ ...props }) => <ul className="list-disc pl-5 max-w-96" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal pl-5 max-w-96" {...props} />,
        a: ({ ...props }) => <a className="text-blue-500 underline hover:text-blue-700" {...props} />,
        blockquote: ({ ...props }) => <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-500" {...props} />,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}