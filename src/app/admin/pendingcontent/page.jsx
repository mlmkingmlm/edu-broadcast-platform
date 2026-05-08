"use client";

import React from "react";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";

import ProtectedRoute from "@/components/auth/protectedRoute";

export default function PendingApprovalsPage() {

  return (
    <ProtectedRoute allowedRole="admin">

      <div className="w-full">

        {/* Breadcrumb */}
        <PageBreadcrumb pageTitle="Pending Approvals" />

        <div className="space-y-6">

          {/* Table Card */}
          <ComponentCard title="All Pending Content">

            <BasicTableOne
              title="Pending Approvals"
              filterStatus="Pending"
              showActions={true}
            />

          </ComponentCard>

        </div>

      </div>

    </ProtectedRoute>
  );
}