"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import Modal from "../ui/modal/index";

import { useRouter } from "next/navigation";

export default function UserDropdown() {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [user, setUser] = useState(null);

  // Load Current User
  useEffect(() => {

    const currentUser =
      JSON.parse(localStorage.getItem("user"));

    if (currentUser) {
      setUser(currentUser);
    }

  }, []);

  // Toggle
  function toggleDropdown(e) {

    e.stopPropagation();

    setIsOpen((prev) => !prev);

  }

  // Close
  function closeDropdown() {

    setIsOpen(false);

  }

  // Logout
  function handleLogout() {

    // Remove Auth Data
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    localStorage.removeItem("role");

    // Redirect
    router.push("/signin");

  }

  return (
    <>
      <div className="relative">

        {/* Dropdown Button */}
        <button
          onClick={toggleDropdown}
          className="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400"
        >

          {/* Avatar */}
          <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">

            <Image
              width={44}
              height={44}
              src="/images/user/owner.jpg"
              alt="User"
            />

          </span>

          {/* User Name */}
          <span className="mr-1 block font-medium text-theme-sm">

            {user?.name || "User"}

          </span>

          {/* Arrow */}
          <svg
            className={`stroke-gray-500 transition-transform duration-200 dark:stroke-gray-400 ${isOpen ? "rotate-180" : ""
              }`}
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

          </svg>

        </button>

        {/* Dropdown */}
        <Dropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >

          {/* User Info */}
          <div>

            <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-300">

              {user?.name || "Unknown User"}

            </span>

            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">

              {user?.email || "No Email"}

            </span>

          </div>

          {/* Menu */}
          <ul
            className="flex flex-col gap-1 border-b border-gray-200 pb-3 pt-4
          dark:border-gray-800"
          >

            {/* Role */}
            <DropdownItem
              className="rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300"
            >

              Role: {user?.role || "N/A"}

            </DropdownItem>

          </ul>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="group mt-3 flex items-center gap-3 rounded-lg px-3 py-2
          font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700
          dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >

            <svg
              className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
                fill=""
              />

            </svg>

            Sign out

          </button>

        </Dropdown>

      </div>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        className="max-w-[420px] p-6 bg-white dark:bg-gray-900"
      >

        <div className="text-center">

          {/* Icon */}
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full
      bg-red-100 dark:bg-red-500/10"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />

            </svg>

          </div>

          {/* Title */}
          <h2
            className="mt-5 text-xl font-semibold text-gray-800 dark:text-white/90"
          >
            Sign Out
          </h2>

          {/* Description */}
          <p
            className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400"
          >
            Are you sure you want to logout from your account?
          </p>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">

            {/* Cancel */}
            <button
              onClick={() => setShowLogoutModal(false)}
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5
        text-sm font-medium text-gray-700 transition hover:bg-gray-50
        dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium
        text-white transition hover:bg-red-600"
            >
              Logout
            </button>

          </div>

        </div>

      </Modal>
    </>
  );
}