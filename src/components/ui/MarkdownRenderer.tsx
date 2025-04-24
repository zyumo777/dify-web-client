import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// 添加code组件需要的类型
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // 自定义h1渲染
          h1: ({ node, ...props }) => (
            <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />
          ),
          // 自定义h2渲染
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mt-5 mb-3" {...props} />
          ),
          // 自定义h3渲染
          h3: ({ node, ...props }) => (
            <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
          ),
          // 自定义段落渲染
          p: ({ node, ...props }) => <p className="my-3" {...props} />,
          // 自定义链接渲染
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // 自定义代码块渲染
          code: ({ node, inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <pre className="p-4 rounded bg-gray-100 overflow-auto text-sm my-3">
                <code
                  className={match ? `language-${match[1]}` : ''}
                  {...props}
                >
                  {children}
                </code>
              </pre>
            ) : (
              <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            );
          },
          // 自定义blockquote渲染
          blockquote: ({ node, ...props }) => (
            <blockquote className="pl-4 border-l-4 border-gray-300 text-gray-700 my-3" {...props} />
          ),
          // 自定义ul渲染
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 my-3" {...props} />
          ),
          // 自定义ol渲染
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 my-3" {...props} />
          ),
          // 自定义li渲染
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          // 自定义table渲染
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          // 自定义th渲染
          th: ({ node, ...props }) => (
            <th className="border border-gray-300 p-2 bg-gray-100" {...props} />
          ),
          // 自定义td渲染
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 p-2" {...props} />
          ),
          // 自定义hr渲染
          hr: ({ node, ...props }) => <hr className="my-4 border-gray-300" {...props} />,
          // 自定义img渲染
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded my-3" {...props} alt={props.alt || ''} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 