"use client";

import React from "react";

import { useSidebar } from "@/context/SidebarContext";

import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

import ProtectedRoute from "@/components/auth/protectedRoute";

import useAuth from "@/hooks/useAuth";

export default function TeacherLayout({
  children,
}) {

  const {
    isExpanded,
    isHovered,
    isMobileOpen,
  } = useSidebar();

  const {
    role,
    loading,
  } = useAuth();

  // Sidebar Margin
  const mainContentMargin =
    isMobileOpen
      ? "ml-0"
      : isExpanded || isHovered
        ? "lg:ml-[290px]"
        : "lg:ml-[90px]";

  // Loading Spinner
  if (loading) {

    return (

      <div
        className="flex h-screen flex-col items-center
        justify-center gap-4 bg-white
        dark:bg-gray-900"
      >

        <div
          className="h-12 w-12 animate-spin
          rounded-full border-4
          border-brand-500
          border-t-transparent"
        />

        <p
          className="text-sm font-medium
          text-gray-500 dark:text-gray-400"
        >
          Loading Dashboard...
        </p>

      </div>

    );

  }

  return (

    <ProtectedRoute
      allowedRole={role}
    >

      <div className="min-h-screen xl:flex">

        {/* Sidebar */}
        <AppSidebar />

        {/* Backdrop */}
        <Backdrop />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
        >

          {/* Header */}
          <AppHeader />

          {/* Page Content */}
          <div
            className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6"
          >
            {children}
          </div>

        </div>

      </div>

    </ProtectedRoute>

  );

}