"use client";

import React from "react";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";

import ProtectedRoute from "@/components/auth/protectedRoute";

export default function MyContentPage() {

  // Current Logged In User
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  return (
    <ProtectedRoute allowedRole="teacher">

      <div className="w-full">

        {/* Breadcrumb */}
        <PageBreadcrumb pageTitle="My Content" />

        <div className="space-y-6">

          {/* Table Card */}
          <ComponentCard title="My Uploaded Content">

            <BasicTableOne
              title="All Uploaded Content"
              teacherId={currentUser?.id}
              showActions={false}
            />

          </ComponentCard>

        </div>

      </div>

    </ProtectedRoute>
  );
}