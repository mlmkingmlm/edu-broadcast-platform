"use client";

import ProtectedRoute from "@/components/auth/protectedRoute";

import {
  ContentCard,
} from "@/components/content/ContentCard";

import ContentUploadChart
  from "@/components/content/ContentUploadChart";

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

  // Dashboard Hook
  const {
    stats,
    chartData,
    loading,
  } = useDashboardData(
    role,
    user?.id
  );

  // Loading State
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
      allowedRole={role}
    >

      <div className="space-y-6">

        {/* Metrics */}
        <ContentCard
          stats={stats}
          role={role}
        />

        {/* Chart */}
        <ContentUploadChart
          chartData={chartData}
          role={role}
        />

      </div>

    </ProtectedRoute>

  );

}