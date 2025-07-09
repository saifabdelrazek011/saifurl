import React, { useState } from "react";
import { useShorturlsContext } from "../contexts/ShorturlsContext";

function ShortUrl({ url, onEdit, onDelete }) {
  const [copied, setCopied] = useState(false);
  const { shortDomain } = useShorturlsContext();

  const handleCopy = () => {
    const shortUrl = `https://${shortDomain}/${url.short}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shortUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <td className="py-2 px-4 border-b break-all border-blue-100 dark:border-blue-900">
        <a
          href={url.full}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-red-600 dark:text-blue-200 dark:hover:text-red-400"
        >
          {url.full}
        </a>
      </td>
      <td className="py-2 px-4 border-b break-all border-blue-100 dark:border-blue-900">
        <div className="flex items-center gap-2">
          <a
            href={`https://sa.died.pw/${url.short}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 underline hover:text-blue-700 font-semibold dark:text-red-400 dark:hover:text-blue-200"
          >
            {url.short}
          </a>
          <button
            onClick={handleCopy}
            title="Copy short URL"
            className="p-1 rounded transition bg-gray-200 hover:bg-blue-100 text-blue-700 dark:bg-gray-800 dark:hover:bg-blue-900 dark:text-blue-200"
          >
            {copied ? (
              <span className="text-green-500 text-xs font-semibold">
                Copied!
              </span>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect
                  x="9"
                  y="9"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <rect
                  x="3"
                  y="3"
                  width="13"
                  height="13"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </button>
        </div>
      </td>
      <td className="py-2 px-4 border-b text-center border-blue-100 dark:border-blue-900">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold shadow bg-gradient-to-r from-blue-600 to-red-500 text-white dark:from-blue-900 dark:to-red-900">
          {url.clicks}
        </span>
      </td>
      <td className="py-2 px-4 border-b text-center">
        <button
          onClick={() => onEdit(url)}
          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(url._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </>
  );
}

export default ShortUrl;
