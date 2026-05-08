"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LiveListingPage() {

    const [teachers, setTeachers] =
        useState([]);

    useEffect(() => {

        const allContents =
            JSON.parse(
                localStorage.getItem("contents")
            ) || [];

        // Approved Content Only
        const approvedContents =
            allContents.filter(
                (item) =>
                    item.status === "Approved"
            );

        // Unique Teachers
        const uniqueTeachers =
            approvedContents.reduce(
                (acc, current) => {

                    const exists =
                        acc.find(
                            (item) =>
                                item.teacherId ===
                                current.teacherId
                        );

                    if (!exists) {

                        acc.push({

                            teacherId:
                                current.teacherId,

                            teacherName:
                                current.teacherName,

                            totalContent:
                                approvedContents.filter(
                                    (item) =>
                                        item.teacherId ===
                                        current.teacherId
                                ).length,

                        });

                    }

                    return acc;

                },
                []
            );

        setTeachers(uniqueTeachers);

    }, []);

    return (

        <div
            className="min-h-screen bg-gray-50
            px-6 py-12 dark:bg-gray-950"
        >

            {/* Header */}
            <div
                className="mx-auto mb-12 max-w-7xl"
            >

                <h1
                    className="text-4xl font-bold
                    text-gray-900 dark:text-white"
                >
                    Live Broadcasts
                </h1>

                <p
                    className="mt-3 text-gray-500
                    dark:text-gray-400"
                >
                    Watch live educational content
                    from teachers.
                </p>

            </div>

            {/* Empty State */}
            {!teachers.length && (

                <div
                    className="flex h-[60vh] items-center
                    justify-center"
                >

                    <div className="text-center">

                        <h2
                            className="text-2xl font-bold
                            text-gray-800 dark:text-white"
                        >
                            No Live Content
                        </h2>

                        <p
                            className="mt-3 text-gray-500
                            dark:text-gray-400"
                        >
                            No approved broadcasts available.
                        </p>

                    </div>

                </div>

            )}

            {/* Teacher Grid */}
            {!!teachers.length && (

                <div
                    className="mx-auto grid max-w-7xl
                    grid-cols-1 gap-6 sm:grid-cols-2
                    lg:grid-cols-3"
                >

                    {teachers.map((teacher) => (

                        <div
                            key={teacher.teacherId}
                            className="rounded-3xl border
                            border-gray-200 bg-white p-6
                            shadow-sm transition hover:-translate-y-1
                            hover:shadow-lg dark:border-white/[0.05]
                            dark:bg-white/[0.03]"
                        >

                            {/* Avatar */}
                            <div
                                className="flex h-16 w-16
                                items-center justify-center
                                rounded-2xl bg-brand-500
                                text-2xl font-bold text-white"
                            >
                                {teacher.teacherName
                                    ?.charAt(0)}
                            </div>

                            {/* Info */}
                            <div className="mt-5">

                                <h2
                                    className="text-2xl font-bold
                                    text-gray-800 dark:text-white"
                                >
                                    {teacher.teacherName}
                                </h2>

                                <p
                                    className="mt-2 text-sm
                                    text-gray-500 dark:text-gray-400"
                                >
                                    {teacher.totalContent}
                                    {" "}
                                    Approved Broadcasts
                                </p>

                            </div>

                            {/* Button */}
                            <Link
                                href={`/live/${teacher.teacherId}`}
                                className="mt-6 inline-flex w-full
                                items-center justify-center
                                rounded-xl bg-brand-500
                                px-5 py-3 text-sm font-medium
                                text-white transition
                                hover:bg-brand-600"
                            >
                                Watch Live
                            </Link>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

