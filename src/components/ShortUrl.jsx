import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../contexts/DashboardContext";
import { useShorturlsContext } from "../contexts/ShorturlsContext";

function ShortUrl({ url, onEdit, onDelete }) {
  const { theme } = useDashboardContext();
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
      <td
        className={
          "py-2 px-4 border-b break-all " +
          (theme === "dark" ? "border-blue-900" : "border-blue-100")
        }
      >
        <a
          href={url.full}
          target="_blank"
          rel="noopener noreferrer"
          className={
            theme === "dark"
              ? "text-blue-200 underline hover:text-red-400"
              : "text-blue-700 underline hover:text-red-600"
          }
        >
          {url.full}
        </a>
      </td>
      <td
        className={
          "py-2 px-4 border-b break-all " +
          (theme === "dark" ? "border-blue-900" : "border-blue-100")
        }
      >
        <div className="flex items-center gap-2">
          <a
            href={`https://sa.died.pw/${url.short}`}
            target="_blank"
            rel="noopener noreferrer"
            className={
              theme === "dark"
                ? "text-red-400 underline hover:text-blue-200 font-semibold"
                : "text-red-600 underline hover:text-blue-700 font-semibold"
            }
          >
            {url.short}
          </a>
          <button
            onClick={handleCopy}
            title="Copy short URL"
            className={`p-1 rounded transition ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-blue-900 text-blue-200"
                : "bg-gray-200 hover:bg-blue-100 text-blue-700"
            }`}
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
      <td
        className={
          "py-2 px-4 border-b text-center " +
          (theme === "dark" ? "border-blue-900" : "border-blue-100")
        }
      >
        <span
          className={
            "inline-block px-3 py-1 rounded-full text-xs font-bold shadow " +
            (theme === "dark"
              ? "bg-gradient-to-r from-blue-900 to-red-900 text-white"
              : "bg-gradient-to-r from-blue-600 to-red-500 text-white")
          }
        >
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
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </>
  );
}
export default ShortUrl;
