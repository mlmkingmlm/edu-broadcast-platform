"use client";

import React from "react";

import { useSidebar } from "@/context/SidebarContext";

import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";

import ProtectedRoute from "@/components/auth/protectedRoute";

import useAuth from "@/hooks/useAuth";

export default function AdminLayout({
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

  // Prevent Flash
  if (loading) {

    return (

      <div
        className="flex h-screen items-center
        justify-center bg-white
        dark:bg-gray-900"
      >

        <div
          className="h-10 w-10 animate-spin
          rounded-full border-4
          border-brand-500
          border-t-transparent"
        />

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