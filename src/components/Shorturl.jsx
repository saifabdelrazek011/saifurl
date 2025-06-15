import React from "react";

function ShortUrl({ url }) {
  return (
    <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 transition">
      <td className="py-2 px-4 border-b border-blue-100 break-all">
        <a
          href={url.full}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline hover:text-red-600"
        >
          {url.full}
        </a>
      </td>
      <td className="py-2 px-4 border-b border-blue-100 break-all">
        <a
          href={url.short}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline hover:text-blue-700 font-semibold"
        >
          {url.short}
        </a>
      </td>
      <td className="py-2 px-4 border-b border-blue-100">
        {new Date(url.createdAt).toLocaleString()}
      </td>
      <td className="py-2 px-4 border-b border-blue-100 text-center">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
          {url.clicks}
        </span>
      </td>
    </tr>
  );
}

export default ShortUrl;
