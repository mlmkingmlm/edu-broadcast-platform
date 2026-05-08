"use client";

import { useEffect, useState } from "react";

import {
    getDashboardStats,
    getTeacherDashboardStats,
    getTeacherUploadStats,
} from "@/services/content.services";

export default function useDashboardData(role, teacherId) {

    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
    });

    const [chartData, setChartData] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        try {

            // ADMIN
            if (role === "admin") {

                const dashboardStats =
                    getDashboardStats();

                const teacherStats =
                    getTeacherUploadStats();

                setStats(dashboardStats);

                setChartData(teacherStats);

            }

            // TEACHER
            else if (role === "teacher") {

                const teacherStats =
                    getTeacherDashboardStats(teacherId);

                setStats(teacherStats);

                setChartData({
                    Uploads: teacherStats.total,
                });

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    }, [role, teacherId]);

    return {
        stats,
        chartData,
        loading,
    };
}