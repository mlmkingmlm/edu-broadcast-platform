"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadContent } from "@/services/content.services";
import Modal from "@/components/ui/modal/index";

// ✅ Validation Schema
const uploadSchema = z.object({
  title: z.string().min(3, "Title is required"),

  subject: z.string().min(1, "Subject is required"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  startTime: z.string().min(1, "Start time is required"),

  endTime: z.string().min(1, "End time is required"),
});

export default function UploadContentPage() {

  const [preview, setPreview] = useState(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [showSuccessModal, setShowSuccessModal] =
    useState(false);

  const [showErrorModal, setShowErrorModal] =
    useState(false);

  const [modalMessage, setModalMessage] =
    useState("");

  // Current User
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(uploadSchema),
  });

  const startTime =
    watch("startTime");

  // File Preview
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    // ✅ Video Size Limit
    if (
      file.type.startsWith("video")
      &&
      file.size > 3 * 1024 * 1024
    ) {

      setModalMessage(
        "Video size must be less than 3MB"
      );

      setShowErrorModal(true);

      return;

    }

    setSelectedFile(file);

    // Preview only for images
    if (
      file.type.startsWith("image")
    ) {

      setPreview(
        URL.createObjectURL(file)
      );

    } else {

      setPreview(null);

    }

  };

  const convertToBase64 = (file) => {

    return new Promise(
      (resolve, reject) => {

        const reader =
          new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = (error) => {
          reject(error);
        };

      }
    );

  };

  // Submit
  const onSubmit = async (data) => {

    if (!selectedFile) {

      setModalMessage(
        "Please upload a file"
      );

      setShowErrorModal(true);

      return;

    }

    // ✅ End Time Validation
    if (
      new Date(data.endTime)
      <=
      new Date(data.startTime)
    ) {

      setModalMessage(
        "End time must be after start time"
      );

      setShowErrorModal(true);

      return;

    }

    try {

      // Convert File
      const fileUrl =
        await convertToBase64(
          selectedFile
        );

      // Upload Content
      await uploadContent({

        teacherId:
          currentUser?.id,

        teacherName:
          currentUser?.name,

        title: data.title,

        subject: data.subject,

        description:
          data.description,

        fileName:
          selectedFile.name,

        fileType:
          selectedFile.type,

        fileUrl,

        startTime:
          data.startTime,

        endTime:
          data.endTime,

      });

      setModalMessage(
        "Content uploaded successfully and sent for admin approval."
      );

      setShowSuccessModal(true);

      // Reset Form
      reset();

      setPreview(null);

      setSelectedFile(null);

    } catch (error) {

      console.log(error);

      setModalMessage(
        "Something went wrong while uploading content."
      );

      setShowErrorModal(true);

    }

  };

  return (
    <>
      <div className="w-full">

        {/* Breadcrumb */}
        <PageBreadcrumb
          pageTitle="Upload Content"
        />

        {/* Main Card */}
        <div
          className="rounded-2xl border border-gray-200
          bg-white p-5 dark:border-white/[0.05]
          dark:bg-white/[0.03] md:p-6"
        >

          {/* Heading */}
          <div className="mb-6">

            <h2
              className="text-xl font-semibold
              text-gray-800 dark:text-white/90"
            >
              Upload Educational Content
            </h2>

            <p
              className="mt-1 text-sm text-gray-500
              dark:text-gray-400"
            >
              Upload learning materials
              for students broadcasting.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* Title + Subject */}
            <div
              className="grid grid-cols-1 gap-6
              md:grid-cols-2"
            >

              {/* Title */}
              <div>

                <label
                  className="mb-2 block text-sm
                  font-medium text-gray-700
                  dark:text-gray-300"
                >
                  Content Title
                </label>

                <input
                  type="text"
                  placeholder="Enter content title"
                  {...register("title")}
                  className="h-11 w-full rounded-lg border border-gray-300
                  bg-transparent px-4 py-2.5 text-sm text-gray-800
                  placeholder:text-gray-400 focus:border-brand-300
                  focus:outline-none focus:ring focus:ring-brand-500/10
                  dark:border-gray-700 dark:bg-gray-900
                  dark:text-white/90 dark:placeholder:text-white/30
                  dark:focus:border-brand-800"
                />

                {errors.title && (

                  <p
                    className="mt-1 text-sm text-error-500"
                  >
                    {errors.title.message}
                  </p>

                )}

              </div>

              {/* Subject */}
              <div>

                <label
                  className="mb-2 block text-sm
                  font-medium text-gray-700
                  dark:text-gray-300"
                >
                  Subject
                </label>

                <select
                  {...register("subject")}
                  className="h-11 w-full rounded-lg border border-gray-300
                  bg-transparent px-4 py-2.5 text-sm text-gray-800
                  focus:border-brand-300 focus:outline-none focus:ring
                  focus:ring-brand-500/10 dark:border-gray-700
                  dark:bg-gray-900 dark:text-white/90
                  dark:focus:border-brand-800"
                >

                  <option value="">
                    Select Subject
                  </option>

                  <option value="Mathematics">
                    Mathematics
                  </option>

                  <option value="Science">
                    Science
                  </option>

                  <option value="English">
                    English
                  </option>

                  <option value="History">
                    History
                  </option>

                  <option value="Computer">
                    Computer
                  </option>

                </select>

                {errors.subject && (

                  <p
                    className="mt-1 text-sm text-error-500"
                  >
                    {errors.subject.message}
                  </p>

                )}

              </div>

            </div>

            {/* Description */}
            <div>

              <label
                className="mb-2 block text-sm
                font-medium text-gray-700
                dark:text-gray-300"
              >
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Write content description..."
                {...register("description")}
                className="w-full rounded-lg border border-gray-300
                bg-transparent px-4 py-3 text-sm text-gray-800
                placeholder:text-gray-400 focus:border-brand-300
                focus:outline-none focus:ring focus:ring-brand-500/10
                dark:border-gray-700 dark:bg-gray-900
                dark:text-white/90 dark:placeholder:text-white/30
                dark:focus:border-brand-800"
              />

              {errors.description && (

                <p
                  className="mt-1 text-sm text-error-500"
                >
                  {errors.description.message}
                </p>

              )}

            </div>

            {/* File Upload */}
            <div>

              <label
                className="mb-2 block text-sm
                font-medium text-gray-700
                dark:text-gray-300"
              >
                Upload File
              </label>

              <input
                type="file"
                accept="image/*,video/*,.pdf"
                onChange={handleFileChange}
                className="block w-full text-sm
                text-gray-500 dark:text-gray-400
                file:mr-4 file:rounded-lg
                file:border-0 file:bg-brand-500
                file:px-4 file:py-2
                file:text-sm file:font-medium
                file:text-white hover:file:bg-brand-600"
              />

            </div>

            {/* Preview */}
            {preview && (

              <div>

                <label
                  className="mb-3 block text-sm
                  font-medium text-gray-700
                  dark:text-gray-300"
                >
                  File Preview
                </label>

                <div
                  className="overflow-hidden rounded-xl
                  border border-gray-200
                  dark:border-white/[0.05]"
                >

                  <img
                    src={preview}
                    alt="Preview"
                    className="h-60 w-full object-cover"
                  />

                </div>

              </div>

            )}

            {/* Schedule */}
            <div
              className="grid grid-cols-1 gap-6
              md:grid-cols-2"
            >

              {/* Start Time */}
              <div>

                <label
                  className="mb-2 block text-sm
                  font-medium text-gray-700
                  dark:text-gray-300"
                >
                  Start Time
                </label>

                <input
                  type="datetime-local"
                  min={
                    new Date()
                      .toISOString()
                      .slice(0, 16)
                  }

                  {...register("startTime", {

                    onChange: () => {

                      // Reset End Time
                      setValue(
                        "endTime",
                        ""
                      );

                    },

                  })}
                  className="h-11 w-full rounded-lg border border-gray-300
                  bg-transparent px-4 py-2.5 text-sm text-gray-800
                  focus:border-brand-300 focus:outline-none
                  focus:ring focus:ring-brand-500/10
                  dark:border-gray-700 dark:bg-gray-900
                  dark:text-white/90 dark:focus:border-brand-800"
                />

                {errors.startTime && (

                  <p
                    className="mt-1 text-sm text-error-500"
                  >
                    {errors.startTime.message}
                  </p>

                )}

              </div>

              {/* End Time */}
              <div>

                <label
                  className="mb-2 block text-sm
                  font-medium text-gray-700
                  dark:text-gray-300"
                >
                  End Time
                </label>

                <input
                  type="datetime-local"

                  disabled={!startTime}

                  min={
                    startTime ||

                    new Date()
                      .toISOString()
                      .slice(0, 16)
                  }
                  {...register("endTime")}
                  className="h-11 w-full rounded-lg border border-gray-300
                  bg-transparent px-4 py-2.5 text-sm text-gray-800
                  focus:border-brand-300 focus:outline-none
                  focus:ring focus:ring-brand-500/10
                  dark:border-gray-700 dark:bg-gray-900
                  dark:text-white/90 dark:focus:border-brand-800"
                />

                {errors.endTime && (

                  <p
                    className="mt-1 text-sm text-error-500"
                  >
                    {errors.endTime.message}
                  </p>

                )}

              </div>

            </div>

            {/* Submit */}
            <div className="flex justify-end">

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-brand-500
                px-6 py-3 text-sm font-medium
                text-white transition
                hover:bg-brand-600
                disabled:opacity-50"
              >
                {isSubmitting
                  ? "Uploading..."
                  : "Upload Content"}
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() =>
          setShowSuccessModal(false)
        }
        className="max-w-[420px] border border-green-200
        bg-green-50 p-6 dark:border-green-500/20
        dark:bg-green-500/10"
      >

        <div className="text-center">

          <div
            className="mx-auto flex h-14 w-14
            items-center justify-center
            rounded-full bg-green-100
            dark:bg-green-500/10"
          >

            <svg
              className="h-7 w-7 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />

            </svg>

          </div>

          <h2
            className="mt-5 text-xl font-semibold
            text-gray-800 dark:text-white/90"
          >
            Upload Successful
          </h2>

          <p
            className="mt-2 text-sm leading-6
            text-gray-500 dark:text-gray-400"
          >
            {modalMessage}
          </p>

          <button
            onClick={() =>
              setShowSuccessModal(false)
            }
            className="mt-6 rounded-xl bg-brand-500
            px-5 py-2.5 text-sm font-medium
            text-white transition hover:bg-brand-600"
          >
            Okay
          </button>

        </div>

      </Modal>

      {/* Error Modal */}
      <Modal
        isOpen={showErrorModal}
        onClose={() =>
          setShowErrorModal(false)
        }
        className="max-w-[420px] border border-red-200
        bg-red-50 p-6 dark:border-red-500/20
        dark:bg-red-500/10"
      >

        <div className="text-center">

          <div
            className="mx-auto flex h-14 w-14
            items-center justify-center
            rounded-full bg-red-100
            dark:bg-red-500/10"
          >

            <svg
              className="h-7 w-7 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />

            </svg>

          </div>

          <h2
            className="mt-5 text-xl font-semibold
            text-gray-800 dark:text-white/90"
          >
            Upload Failed
          </h2>

          <p
            className="mt-2 text-sm leading-6
            text-gray-500 dark:text-gray-400"
          >
            {modalMessage}
          </p>

          <button
            onClick={() =>
              setShowErrorModal(false)
            }
            className="mt-6 rounded-xl bg-red-500
            px-5 py-2.5 text-sm font-medium
            text-white transition hover:bg-red-600"
          >
            Close
          </button>

        </div>

      </Modal>
    </>
  );
}