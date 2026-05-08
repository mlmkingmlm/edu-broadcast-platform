"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";

import useContentTable from "@/hooks/useContentTable";

import { updateContentStatus } from "@/services/content.services";
import Modal from "../ui/modal/index";
import Pagination from "./Pagination";
import {
  getContentTimingStatus,
} from "@/utils/contentStatus";

export default function BasicTableOne({
  showActions = false,
  filterStatus,
  title = "All Uploaded Content",
  teacherId,
}) {

  // Hook
  const {
    data: filteredData,
    loading,
    refetch,
  } = useContentTable({
    filterStatus,
    teacherId,
  });

  const [showApproveModal, setShowApproveModal] =
    useState(false);

  const [showRejectModal, setShowRejectModal] =
    useState(false);

  const [selectedContentId, setSelectedContentId] =
    useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  // Approve
  const handleApprove = () => {

    updateContentStatus(
      selectedContentId,
      "Approved"
    );

    refetch();

    setShowApproveModal(false);

  };

  // Reject
  const handleReject = () => {

    if (!rejectionReason.trim()) return;

    updateContentStatus(
      selectedContentId,
      "Rejected",
      rejectionReason
    );

    refetch();

    setShowRejectModal(false);

    setRejectionReason("");

  };

  const tableData = useMemo(() => {

    return filteredData.filter((content) => {

      const matchesSearch =

        content.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())

        ||

        content.subject
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())

        ||

        content.teacherName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =

        statusFilter === "All"

        ||

        content.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [
    filteredData,
    searchTerm,
    statusFilter,
  ]);

  const totalPages = Math.ceil(
    tableData.length / itemsPerPage
  );

  const paginatedData =
    tableData.slice(

      (currentPage - 1) * itemsPerPage,

      currentPage * itemsPerPage

    );

  // Loading
  if (loading) {
    return (

      <div
        className="flex items-center justify-center py-10
        text-gray-500 dark:text-gray-400"
      >
        Loading Content...
      </div>

    );
  }

  return (
    <>
      <div className="w-full">

        <div
          className="overflow-hidden rounded-xl border border-gray-200 bg-white
        dark:border-white/[0.05] dark:bg-white/[0.03]"
        >

          {/* Table Header */}
          <div
            className="border-b border-gray-100 px-5 py-4
          dark:border-white/[0.05]"
          >

            <div
              className="flex flex-col gap-4 lg:flex-row
  lg:items-center lg:justify-between"
            >

              <h3
                className="text-lg font-semibold
    text-gray-800 dark:text-white/90"
              >
                {title}
              </h3>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => {

                    setSearchTerm(e.target.value);

                    setCurrentPage(1);

                  }}
                  className="h-11 rounded-xl border border-gray-300
      bg-white px-4 text-sm text-gray-800
      outline-none focus:border-brand-500
      dark:border-gray-700 dark:bg-gray-900
      dark:text-white/90"
                />

                {/* Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {

                    setStatusFilter(e.target.value);

                    setCurrentPage(1);

                  }}
                  className="h-11 rounded-xl border border-gray-300
      bg-white px-4 text-sm text-gray-800
      outline-none focus:border-brand-500
      dark:border-gray-700 dark:bg-gray-900
      dark:text-white/90"
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* Table */}
          <div className="max-w-full overflow-x-auto">

            <Table>

              {/* Header */}
              <TableHeader
                className="border-b border-gray-100 dark:border-white/[0.05]"
              >

                <TableRow>

                  {/* Preview */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Preview
                  </TableCell>

                  {/* Title */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Title
                  </TableCell>

                  {/* Subject */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Subject
                  </TableCell>

                  {/* Teacher */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Teacher
                  </TableCell>

                  {/* Approval Status */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Status
                  </TableCell>

                  {/* Timing Status */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Live Status
                  </TableCell>

                  {/* Rejection Reason */}
                  <TableCell
                    isHeader
                    className="px-5 py-3 text-start text-theme-xs font-medium
                  text-gray-500 dark:text-gray-400"
                  >
                    Reason
                  </TableCell>

                  {/* Actions */}
                  {showActions && (
                    <TableCell
                      isHeader
                      className="px-5 py-3 text-start text-theme-xs font-medium
                    text-gray-500 dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  )}

                </TableRow>

              </TableHeader>

              {/* Body */}
              <TableBody
                className="divide-y divide-gray-100 dark:divide-white/[0.05]"
              >

                {paginatedData.length > 0 ? (

                  paginatedData.map((content) => {

                    const timingStatus =
                      getContentTimingStatus(content);

                    return (

                      <TableRow key={content.id}>

                        {/* Preview */}
                        <TableCell className="px-5 py-4 sm:px-6">

                          <div className="h-12 w-12 overflow-hidden rounded-lg">

                            {content.fileType?.startsWith("image") ? (

                              <img
                                src={content.fileUrl}
                                alt={content.title}
                                className="h-full w-full object-cover"
                              />

                            ) : (

                              <div
                                className="flex h-full w-full items-center justify-center
                            rounded-lg bg-gray-100 text-xs text-gray-500
                            dark:bg-white/[0.05] dark:text-gray-400"
                              >
                                FILE
                              </div>

                            )}

                          </div>

                        </TableCell>

                        {/* Title */}
                        <TableCell
                          className="px-4 py-3 text-theme-sm font-medium
                      text-gray-800 dark:text-white/90"
                        >
                          {content.title}
                        </TableCell>

                        {/* Subject */}
                        <TableCell
                          className="px-4 py-3 text-theme-sm
                      text-gray-500 dark:text-gray-400"
                        >
                          {content.subject}
                        </TableCell>

                        {/* Teacher */}
                        <TableCell
                          className="px-4 py-3 text-theme-sm
                      text-gray-500 dark:text-gray-400"
                        >
                          {content.teacherName}
                        </TableCell>

                        {/* Approval Status */}
                        <TableCell className="px-4 py-3">

                          <Badge
                            size="sm"
                            color={
                              content.status === "Approved"
                                ? "success"
                                : content.status === "Pending"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {content.status}
                          </Badge>

                        </TableCell>

                        {/* Timing Status */}
                        <TableCell className="px-4 py-3">

                          <Badge
                            size="sm"
                            color={
                              timingStatus === "Active"
                                ? "success"
                                : timingStatus === "Scheduled"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {timingStatus}
                          </Badge>

                        </TableCell>

                        {/* Rejection Reason */}
                        <TableCell
                          className="px-4 py-3 text-theme-sm
                      text-gray-500 dark:text-gray-400"
                        >

                          {content.rejectionReason
                            ? content.rejectionReason
                            : "-"}

                        </TableCell>

                        {/* Actions */}
                        {showActions && (

                          <TableCell className="px-4 py-3">

                            <div className="flex items-center gap-2">

                              {/* Approve */}
                              <button
                                onClick={() => {

                                  setSelectedContentId(content.id);

                                  setShowApproveModal(true);

                                }}
                                className="rounded-lg bg-green-100 px-3 py-1 text-xs font-medium
  text-green-700 hover:bg-green-200
  dark:bg-green-500/20 dark:text-green-400"
                              >
                                Approve
                              </button>

                              {/* Reject */}
                              <button
                                onClick={() => {

                                  setSelectedContentId(content.id);

                                  setShowRejectModal(true);

                                }}
                                className="rounded-lg bg-red-100 px-3 py-1 text-xs font-medium
  text-red-700 hover:bg-red-200
  dark:bg-red-500/20 dark:text-red-400"
                              >
                                Reject
                              </button>

                            </div>

                          </TableCell>

                        )}

                      </TableRow>

                    );

                  })

                ) : (

                  <TableRow>

                    <td
                      colSpan={showActions ? 8 : 7}
                      className="py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No Content Found
                    </td>

                  </TableRow>

                )}

              </TableBody>

            </Table>

            <div className="px-5 pb-5">

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        className="max-w-[420px] bg-green-50/90 border-green-200 p-6 dark:border-green-500/20 dark:bg-green-500/10"
      >

        <div className="text-center">

          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full
      bg-green-100 dark:bg-green-500/20"
          >
            ✅
          </div>

          <h2
            className="mt-5 text-xl font-semibold text-gray-800 dark:text-white/90"
          >
            Approve Content
          </h2>

          <p
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Are you sure you want to approve this content?
          </p>

          <div className="mt-6 flex justify-center gap-3">

            <button
              onClick={() => setShowApproveModal(false)}
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm
        font-medium text-gray-700 hover:bg-gray-100
        dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>

            <button
              onClick={handleApprove}
              className="rounded-xl bg-green-500 px-5 py-2 text-sm
        font-medium text-white hover:bg-green-600"
            >
              Approve
            </button>

          </div>

        </div>

      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        className="max-w-[420px] bg-red-50/90 border-red-200 p-6 dark:border-red-500/20 dark:bg-red-500/10"
      >

        <div>

          <div className="text-center">

            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full
        bg-red-100 dark:bg-red-500/20"
            >
              ❌
            </div>

            <h2
              className="mt-5 text-xl font-semibold text-gray-800 dark:text-white/90"
            >
              Reject Content
            </h2>

            <p
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              Please enter rejection reason.
            </p>

          </div>

          {/* Input */}
          <textarea
            rows={4}
            value={rejectionReason}
            onChange={(e) =>
              setRejectionReason(e.target.value)
            }
            placeholder="Enter rejection reason..."
            className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3
      text-sm text-gray-800 focus:border-red-300 focus:outline-none
      dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
          />

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-3">

            <button
              onClick={() => setShowRejectModal(false)}
              className="rounded-xl border border-gray-300 px-5 py-2 text-sm
        font-medium text-gray-700 hover:bg-gray-100
        dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.05]"
            >
              Cancel
            </button>

            <button
              onClick={handleReject}
              className="rounded-xl bg-red-500 px-5 py-2 text-sm
        font-medium text-white hover:bg-red-600"
            >
              Reject
            </button>

          </div>

        </div>

      </Modal>
    </>
  );
}