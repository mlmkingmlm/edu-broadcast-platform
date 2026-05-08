"use client";

import ProtectedRoute
  from "@/components/auth/protectedRoute";

import {
  ContentCard,
} from "@/components/content/ContentCard";

import BasicTableOne
  from "@/components/tables/BasicTableOne";

import useDashboardData
  from "@/hooks/useDashboardData";

import useAuth
  from "@/hooks/useAuth";

export default function Ecommerce() {

  // Auth Hook
  const {
    user,
    role,
    loading: authLoading,
  } = useAuth();

  // Dashboard Data
  const {
    stats,
    loading,
  } = useDashboardData(
    role,
    user?.id
  );

  // Loading
  if (
    authLoading
    ||
    loading
  ) {

    return (

      <div
        className="flex h-[70vh]
        items-center justify-center"
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
      allowedRole="teacher"
    >

      <div className="space-y-6">

        {/* Metrics */}
        <ContentCard
          stats={stats}
        />

        {/* Uploaded Content Table */}
        <div className="w-full">

          <BasicTableOne
            title="All Uploaded Content"
            teacherId={user?.id}
            showActions={false}
          />

        </div>

      </div>

    </ProtectedRoute>

  );

}