"use client";

import React from "react";

import {
  BoxIconLine,
  GroupIcon,
  CheckCircleIcon,
  CloseIcon,
  CloseLineIcon,
} from "@/icons";

export const ContentCard = ({
  stats = {},
}) => {

  const {
    total = 0,
    pending = 0,
    approved = 0,
    rejected = 0,
  } = stats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">

      {/* Total Content */}
      <div
        className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md
        dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
      >

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl
          bg-blue-100 dark:bg-blue-500/20"
        >
          <BoxIconLine className="size-6 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="mt-5">

          <span className="text-sm text-gray-500 dark:text-gray-400">
            My Total Content
          </span>

          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {total}
          </h4>

        </div>

      </div>

      {/* Pending */}
      <div
        className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md
        dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
      >

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl
          bg-yellow-100 dark:bg-yellow-500/20"
        >
          <GroupIcon className="size-6 text-yellow-600 dark:text-yellow-400" />
        </div>

        <div className="mt-5">

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Pending
          </span>

          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {pending}
          </h4>

        </div>

      </div>

      {/* Approved */}
      <div
        className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md
        dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
      >

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl
          bg-green-100 dark:bg-green-500/20"
        >
          <CheckCircleIcon className="size-6 text-green-600 dark:text-green-400" />
        </div>

        <div className="mt-5">

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Approved
          </span>

          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {approved}
          </h4>

        </div>

      </div>

      {/* Rejected */}
      <div
        className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:shadow-md
        dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
      >

        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl
          bg-red-100 dark:bg-red-500/20"
        >
          <CloseLineIcon className="size-5 text-red-600 dark:text-red-400" />
        </div>

        <div className="mt-5">

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Rejected
          </span>

          <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
            {rejected}
          </h4>

        </div>

      </div>

    </div>
  );
};