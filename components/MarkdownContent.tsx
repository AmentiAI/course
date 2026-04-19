"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-content prose-school">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-serif text-3xl font-bold text-[#0a2540] mb-6 mt-10 pb-3 border-b border-slate-200 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-serif text-2xl font-bold text-[#0a2540] mb-4 mt-10 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-serif text-xl font-bold text-[#0a2540] mb-3 mt-7 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-[#0a2540] mb-2 mt-5">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-slate-700 leading-[1.75] mb-5 text-[15.5px]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside space-y-2 mb-5 text-slate-700 ml-6 marker:text-slate-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside space-y-2 mb-5 text-slate-700 ml-6 marker:text-slate-500 marker:font-semibold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-slate-700 leading-relaxed text-[15.5px] pl-1">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#0a2540]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-800">
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#b08d57] pl-5 py-3 my-6 bg-[#f5ecd7]/60 rounded-r-md">
              <div className="text-[#0a2540] italic font-serif">
                {children}
              </div>
            </blockquote>
          ),
          code: ({ inline, children, ...props }: any) => {
            if (inline) {
              return (
                <code className="bg-[#fafaf9] text-[#98753f] px-1.5 py-0.5 rounded text-[13.5px] font-mono border border-slate-200">
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block bg-[#0a2540] text-slate-100 p-4 rounded-md my-4 overflow-x-auto text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-[#0a2540] rounded-md overflow-x-auto my-6">
              {children}
            </pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a2540] hover:text-[#98753f] font-semibold underline decoration-[#b08d57]/50 hover:decoration-[#b08d57] underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-slate-200 my-10" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-slate-200 rounded-md overflow-hidden">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#fafaf9] border-b border-slate-200">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-200 bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[#fafaf9]">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-[10px] font-bold tracking-[0.15em] uppercase text-[#98753f]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
