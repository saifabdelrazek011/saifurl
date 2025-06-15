import React from "react";

function ShortUrl({ url, theme, onEdit, onDelete }) {
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
        <a
          href={url.short}
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
