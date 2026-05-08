"use client";

import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {

  const startPage =
    Math.max(currentPage - 1, 1);

  const endPage =
    Math.min(startPage + 2, totalPages);

  const pagesAroundCurrent =
    Array.from(
      {
        length:
          endPage - startPage + 1,
      },
      (_, i) => startPage + i
    );

  return (

    <div
      className="mt-6 flex flex-col gap-4
      sm:flex-row sm:items-center sm:justify-between"
    >

      {/* Info */}
      <p
        className="text-sm text-gray-500
        dark:text-gray-400"
      >
        Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
      </p>

      {/* Pagination */}
      <div className="flex items-center">

        {/* Previous */}
        <button
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          disabled={
            currentPage === 1 ||
            totalPages === 0
          }
          className="mr-2.5 flex h-10 items-center justify-center
          rounded-lg border border-gray-300 bg-white
          px-3.5 py-2.5 text-sm text-gray-700
          shadow-theme-xs hover:bg-gray-50
          disabled:opacity-50 dark:border-gray-700
          dark:bg-gray-800 dark:text-gray-400
          dark:hover:bg-white/[0.03]"
        >
          Previous
        </button>

        {/* Pages */}
        <div className="flex items-center gap-2">

          {currentPage > 3 && (
            <span className="px-2 text-gray-500">
              ...
            </span>
          )}

          {pagesAroundCurrent.map((page) => (

            <button
              key={page}
              onClick={() =>
                onPageChange(page)
              }
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition
              ${currentPage === page
                  ? "bg-brand-500 text-white"
                  : "text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500"
                }`}
            >
              {page}
            </button>

          ))}

          {currentPage < totalPages - 2 && (
            <span className="px-2 text-gray-500">
              ...
            </span>
          )}

        </div>

        {/* Next */}
        <button
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
          className="ml-2.5 flex h-10 items-center justify-center
          rounded-lg border border-gray-300 bg-white
          px-3.5 py-2.5 text-sm text-gray-700
          shadow-theme-xs hover:bg-gray-50
          disabled:opacity-50 dark:border-gray-700
          dark:bg-gray-800 dark:text-gray-400
          dark:hover:bg-white/[0.03]"
        >
          Next
        </button>

      </div>

    </div>

  );

}