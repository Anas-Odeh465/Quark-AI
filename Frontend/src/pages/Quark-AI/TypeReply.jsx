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

          // 🔥 CODE BLOCK (UPDATED)
          code({ inline, className, children }) {
            const [copied, setCopied] = useState(false);
            const codeString = String(children).replace(/\n$/, "");
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "code";

            const handleCopy = () => {
              navigator.clipboard.writeText(codeString);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            };

            if (!inline && match) {
              return (
                <div className="my-4 rounded-lg overflow-hidden">

                  {/* 🔥 HEADER */}
                  <div
                    className={`
                      flex justify-between items-center px-4 py-2 text-xs font-medium
                      ${mode
                        ? "bg-[#2b2b2b] text-gray-300"
                        : "bg-gray-200 text-gray-700"}
                    `}
                  >
                    <span className="opacity-80">{language}</span>

                    <button
                      onClick={handleCopy}
                      className={`
                        px-2 py-1 rounded transition-all duration-200
                        ${mode
                          ? "hover:bg-gray-600"
                          : "hover:bg-gray-300"}
                      `}
                    >
                      {copied ? "✔ Copied" : "Copy"}
                    </button>
                  </div>

                  {/* 🔥 CODE BODY */}
                  <div className="relative">
                    <SyntaxHighlighter
                      style={oneDark}
                      language={language}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        paddingTop: "12px"
                      }}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>

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

          // 🔥 LISTS
          ol: (props) => (
            <ol
              {...props}
              style={{ direction, listStylePosition: "inside" }}
              className="list-decimal mb-3"
            />
          ),

          ul: (props) => (
            <ul
              {...props}
              style={{ direction, listStylePosition: "inside" }}
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

          // 🔥 TABLES
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