import React, { useState, useEffect } from "react";
import ShortUrl from "../components/ShortUrl";
import { useDashboardContext } from "../contexts/DashboardContext";
import { useShorturlsContext } from "../contexts/ShorturlsContext";
import { Link } from "react-router-dom";

function Shorturls() {
  const {
    shortUrls,
    setShortUrls,
    editId,
    setEditId,
    editData,
    setEditData,
    newUrl,
    setNewUrl,
    creating,
    setCreating,
  } = useShorturlsContext();
  const { userData, theme, apiUrl } = useDashboardContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 10;

  useEffect(() => {
    fetchShortUrls();
    // eslint-disable-next-line
  }, []);

  // Reset to page 1 when URLs change
  useEffect(() => {
    setCurrentPage(1);
  }, [shortUrls.length]);

  const fetchShortUrls = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl + "/shorturls", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 404) {
        setShortUrls([]);
        return;
      } else if (!response.ok) {
        setError("Failed to Get short URLs");
      }
      const data = await response.json();
      setShortUrls(data.shortUrls || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (url) => {
    setEditId(url._id);
    setEditData({ fullUrl: url.full, shortUrl: url.short });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/shorturls/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!response.ok) throw new Error("Failed to update short URL");
      setEditId(null);
      fetchShortUrls();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this short URL?"))
      return;
    try {
      const response = await fetch(`${apiUrl}/shorturls/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete short URL");
      fetchShortUrls();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewChange = (e) => {
    setNewUrl({ ...newUrl, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/shorturls`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUrl),
      }).then((res) => res.json());
      if (!response.success) {
        setError(response.message || "Failed to create short URL");
        return;
      }
      setNewUrl({ fullUrl: "", shortUrl: "" });
      setCreating(false);
      fetchShortUrls();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  // Pagination logic
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = shortUrls.slice(indexOfFirstUrl, indexOfLastUrl);
  const totalPages = Math.ceil(shortUrls.length / urlsPerPage);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 rounded-2xl shadow-lg p-8 border-2 border-blue-200 dark:border-blue-900 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 drop-shadow text-blue-700 dark:text-blue-200">
        Your Short URLs
      </h2>
      {userData.user.verified && error && (
        <p className="mb-3 text-red-500 dark:text-red-400">{error}</p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-xl border shadow bg-white border-blue-200 dark:bg-gray-900 dark:border-blue-900">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-red-500 dark:from-blue-900 dark:to-red-900">
              <th className="py-3 px-4 border-b border-blue-200 dark:border-blue-900 text-white font-semibold">
                Original URL
              </th>
              <th className="py-3 px-4 border-b border-blue-200 dark:border-blue-900 text-white font-semibold">
                Short URL
              </th>
              <th className="py-3 px-4 border-b border-blue-200 dark:border-blue-900 text-white font-semibold">
                Clicks
              </th>
              <th className="py-3 px-4 border-b border-blue-200 dark:border-blue-900 text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {!userData.user.verified ? (
              <tr>
                <td colSpan={4}>
                  <div
                    className={`flex flex-col items-center justify-center my-4 py-8 rounded-xl shadow ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-900 via-gray-900 to-red-900 text-yellow-200"
                        : "bg-gradient-to-r from-blue-100 via-white to-red-100 text-yellow-700"
                    }`}
                  >
                    <svg
                      className="w-10 h-10 mb-2 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                    <span className="font-semibold text-lg mb-1">
                      Email Verification Required
                    </span>
                    <span className="text-sm text-center max-w-md">
                      Please verify your email from your profile page to access
                      your short URLs.
                    </span>
                    <Link
                      to="/profile"
                      className={`mt-4 px-5 py-2 rounded-lg font-semibold shadow transition ${
                        theme === "dark"
                          ? "bg-blue-700 text-white hover:bg-blue-600"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Go to Profile
                    </Link>
                  </div>
                </td>
              </tr>
            ) : loading ? (
              <tr>
                <td
                  colSpan={4}
                  className={`text-center py-6 ${
                    theme === "dark" ? "text-red-400" : "text-red-500"
                  }`}
                >
                  <span className="animate-spin">Loading Shorturls...</span>
                </td>
              </tr>
            ) : shortUrls.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className={`text-center py-6 ${
                    theme === "dark" ? "text-red-400" : "text-red-500"
                  }`}
                >
                  <strong>No short URLs found.</strong>
                </td>
              </tr>
            ) : (
              currentUrls.map((url) =>
                editId === url._id ? (
                  <tr key={url._id}>
                    <td className="py-2 px-4 border-b">
                      <input
                        name="fullUrl"
                        value={editData.fullUrl}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 rounded bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        name="shortUrl"
                        value={editData.shortUrl}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 rounded bg-white text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-100 dark:border-blue-900 dark:focus:ring-blue-600"
                      />
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {url.clicks}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        onClick={() => handleEditSave(url._id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={url._id}>
                    <ShortUrl
                      url={url}
                      theme={theme}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </tr>
                )
              )
            )}
            {/* New URL creation row */}
            {creating && (
              <tr>
                <td className="py-2 px-4 border-b align-middle">
                  <input
                    name="fullUrl"
                    value={newUrl.fullUrl}
                    onChange={handleNewChange}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-black border-blue-200 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-blue-900 dark:focus:ring-blue-500 transition"
                    placeholder="Paste the full URL here"
                    autoFocus
                  />
                </td>
                <td className="py-2 px-4 border-b align-middle">
                  <input
                    name="shortUrl"
                    value={newUrl.shortUrl}
                    onChange={handleNewChange}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 bg-white text-black border-blue-200 focus:ring-red-400 dark:bg-gray-800 dark:text-white dark:border-blue-900 dark:focus:ring-red-500 transition"
                    placeholder="Custom short code (optional)"
                  />
                </td>
                <td className="py-2 px-4 border-b text-center align-middle">
                  -
                </td>
                <td className="py-2 px-4 border-b text-center align-middle">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleCreate}
                      className="inline-flex items-center gap-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white px-4 py-2 rounded-lg shadow font-semibold transition min-w-[110px] justify-center dark:from-green-700 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-green-700"
                      style={{ minWidth: "110px" }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Create
                    </button>
                    <button
                      onClick={() => setCreating(false)}
                      className="inline-flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition min-w-[110px] justify-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                      style={{ minWidth: "110px" }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {userData.user.verified && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded font-semibold ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white dark:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-900"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-8 text-right">
        {userData.user.verified && !creating && (
          <button
            onClick={() => setCreating(true)}
            className={`inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-2 rounded-lg shadow hover:from-red-600 hover:to-blue-600 transition font-semibold border border-blue-900 dark:border-blue-900`}
          >
            <svg
              className="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Short URL
          </button>
        )}
        {!userData.user.verified && (
          <Link
            to="/profile"
            className={`inline-block bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-2 rounded-lg shadow hover:from-red-600 hover:to-blue-600 transition font-semibold border border-blue-900 dark:border-blue-900`}
          >
            Verify Email
          </Link>
        )}
      </div>
    </div>
  );
}
export default Shorturls;
