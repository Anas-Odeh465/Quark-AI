import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism/index.js";
import { useState } from "react";

const StreamingText = ({ text = "", mode }) => {

  const isArabic = /[\u0600-\u06FF]/.test(text);
  const direction = isArabic ? "rtl" : "ltr";

  return (
    <div
      style={{
        direction,
        textAlign: direction === "rtl" ? "right" : "left",
        unicodeBidi: "plaintext",
      }}
      className={`
        p-4 rounded-xl transition-all duration-300 text-[15px] leading-relaxed
        ${mode ? "text-white" : "text-black"}
      `}
    >

      <ReactMarkdown
        components={{

          // 🔥 CODE BLOCK
          code({ inline, className, children }) {
            const [copied, setCopied] = useState(false);
            const codeString = String(children).replace(/\n$/, "");
            const match = /language-(\w+)/.exec(className || "");

            const handleCopy = () => {
              navigator.clipboard.writeText(codeString);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            if (!inline && match) {
              return (
                <div className="relative group my-4">

                  <button
                    onClick={handleCopy}
                    className={`
                      absolute top-2 right-2 text-xs px-2 py-1 rounded
                      transition-all duration-300
                      opacity-0 group-hover:opacity-100
                      ${mode
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-black"}
                    `}
                  >
                    {copied ? "✔ Copied" : "Copy"}
                  </button>

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className={`${mode ? "bg-gray-700 text-white" : "bg-gray-200"} px-1 rounded`}>
                {children}
              </code>
            );
          },

          // ✨ TEXT
          p: (props) => <p className="mb-3 leading-relaxed" {...props} />,
          h1: (props) => <h1 className="text-2xl font-bold mb-3" {...props} />,
          h2: (props) => <h2 className="text-xl font-semibold mb-2" {...props} />,

          // 🔥 LISTS (RTL FIX)
          ol: (props) => (
            <ol
              {...props}
              style={{
                direction,
                listStylePosition: "inside"
              }}
              className="list-decimal mb-3"
            />
          ),

          ul: (props) => (
            <ul
              {...props}
              style={{
                direction,
                listStylePosition: "inside"
              }}
              className="list-disc mb-3"
            />
          ),

          li: (props) => (
            <li className="mb-2 leading-relaxed" {...props} />
          ),

          strong: (props) => <strong className="font-bold" {...props} />,

          // 🔥 BLOCKQUOTE
          blockquote: (props) => (
            <blockquote
              className={`
                border-l-4 pl-4 py-2 my-4 rounded-md
                ${mode
                  ? "border-blue-400 bg-gray-800 text-gray-200"
                  : "border-blue-500 bg-blue-50 text-gray-700"}
              `}
              {...props}
            />
          ),

          // 🔥 LINKS
          a: (props) => (
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // 🔥 IMAGES
          img: (props) => (
            <img className="rounded-lg my-4 max-w-full" {...props} />
          ),

          // 🔥 TABLES (🔥 أهم إضافة)
          table: (props) => (
            <div className="overflow-x-auto my-4">
              <table
                className={`
                  min-w-full border rounded-lg overflow-hidden
                  ${mode ? "border-gray-700" : "border-gray-300"}
                `}
                {...props}
              />
            </div>
          ),

          thead: (props) => (
            <thead
              className={`${mode ? "bg-gray-800" : "bg-gray-100"}`}
              {...props}
            />
          ),

          th: (props) => (
            <th
              className={`
                px-4 py-2 text-sm font-semibold border
                ${mode
                  ? "border-gray-700 text-white"
                  : "border-gray-300 text-black"}
              `}
              {...props}
            />
          ),

          td: (props) => (
            <td
              className={`
                px-4 py-2 text-sm border
                ${mode
                  ? "border-gray-700 text-gray-200"
                  : "border-gray-300 text-gray-700"}
              `}
              {...props}
            />
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default StreamingText;