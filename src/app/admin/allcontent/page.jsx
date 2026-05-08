"use client";

import React from "react";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";

import ProtectedRoute from "@/components/auth/protectedRoute";

export default function AllContentPage() {

    return (
        <ProtectedRoute allowedRole="admin">

            <div className="w-full">

                {/* Breadcrumb */}
                <PageBreadcrumb pageTitle="All Uploaded Content" />

                <div className="space-y-6">

                    {/* Table Card */}
                    <ComponentCard title="All Content">

                        <BasicTableOne
                            title="All Uploaded Content"
                            showActions={false}
                        />

                    </ComponentCard>

                </div>

            </div>

        </ProtectedRoute>
    );
}