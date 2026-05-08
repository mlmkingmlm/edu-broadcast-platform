import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className="
        mx-auto mb-10 w-full max-w-60 rounded-2xl
        bg-gray-50 px-4 py-5 text-center
        dark:bg-white/[0.03]
      "
    >

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        EduBroadcast System
      </h3>

      {/* Description */}
      <p className="mb-4 text-theme-sm text-gray-500 dark:text-gray-400">
        Smart digital content broadcasting platform for schools to manage,
        approve, and display educational content seamlessly.
      </p>

      {/* Button */}
      <a
        href="/live"
        className="flex items-center justify-center rounded-lg bg-brand-500 p-3
        font-medium text-white text-theme-sm transition hover:bg-brand-600"
      >
        View Live Content
      </a>

    </div>
  );
}