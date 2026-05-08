"use client";

import Link from "next/link";

import { UserCircleIcon } from "@/icons";

import useAuth from "@/hooks/useAuth";

export default function LandingPage() {

    // Auth Hook
    const { user } = useAuth();

    // Dashboard Route
    const dashboardRoute =
        user?.role === "admin"
            ? "/admin"
            : "/teacher";

    return (
        <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:bg-gray-900">

            {/* Navbar */}
            <header className="border-b border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    {/* Logo */}
                    <div>

                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                            EduBroadcast
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Content Broadcasting System
                        </p>

                    </div>

                    {/* Auth Button */}
                    {user ? (

                        <Link
                            href={dashboardRoute}
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
                        >

                            <UserCircleIcon className="size-5" />

                            Go To Dashboard

                        </Link>

                    ) : (

                        <Link
                            href="/signin"
                            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
                        >

                            <UserCircleIcon className="size-5" />

                            Login

                        </Link>

                    )}

                </div>

            </header>

            {/* Hero Section */}
            <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">

                {/* Badge */}
                <div
                    className="mb-6 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5
                    text-sm font-medium text-brand-600 dark:border-brand-500/20
                    dark:bg-brand-500/10 dark:text-brand-400"
                >
                    Smart Educational Broadcasting Platform
                </div>

                {/* Heading */}
                <h2
                    className="max-w-4xl text-4xl font-bold leading-tight
                    text-gray-800 dark:text-white/90 sm:text-5xl"
                >
                    Manage, Approve & Broadcast Educational Content Seamlessly
                </h2>

                {/* Description */}
                <p
                    className="mt-6 max-w-2xl text-base leading-7
                    text-gray-500 dark:text-gray-400 sm:text-lg"
                >
                    Teachers can upload educational content, principals can approve it,
                    and students can access live broadcasted learning materials publicly.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                    {/* Live Content */}
                    <Link
                        href="/live"
                        className="inline-flex items-center justify-center gap-2 rounded-xl
                        bg-brand-500 px-6 py-3 text-sm font-medium text-white
                        transition hover:bg-brand-600"
                    >
                        View Live Content
                    </Link>

                    {/* Conditional Button */}
                    {user ? (

                        <Link
                            href={dashboardRoute}
                            className="inline-flex items-center justify-center rounded-xl
                            border border-gray-300 bg-white px-6 py-3 text-sm
                            font-medium text-gray-700 transition hover:bg-gray-100
                            dark:border-white/[0.05] dark:bg-white/[0.03]
                            dark:text-white/90 dark:hover:bg-white/[0.05]"
                        >
                            Go To Dashboard
                        </Link>

                    ) : (

                        <Link
                            href="/signin"
                            className="inline-flex items-center justify-center rounded-xl
                            border border-gray-300 bg-white px-6 py-3 text-sm
                            font-medium text-gray-700 transition hover:bg-gray-100
                            dark:border-white/[0.05] dark:bg-white/[0.03]
                            dark:text-white/90 dark:hover:bg-white/[0.05]"
                        >
                            Login as Teacher / Principal
                        </Link>

                    )}

                </div>

            </section>

            {/* Features */}
            <section
                className="mx-auto grid max-w-7xl grid-cols-1 gap-6
    px-6 pb-20 md:grid-cols-3"
            >

                {/* Card 1 */}
                <div
                    className="rounded-2xl border border-gray-200 bg-white p-6
        transition hover:-translate-y-1 hover:shadow-md
        dark:border-white/[0.05] dark:bg-white/[0.03]"
                >

                    <div
                        className="mb-4 flex h-12 w-12 items-center justify-center
            rounded-xl bg-blue-100 dark:bg-blue-500/20"
                    >

                        {/* Upload Icon */}
                        <svg
                            className="h-6 w-6 text-blue-600 dark:text-blue-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>

                    </div>

                    <h3
                        className="text-lg font-semibold text-gray-800
            dark:text-white/90"
                    >
                        Teacher Upload System
                    </h3>

                    <p
                        className="mt-3 text-sm leading-6
            text-gray-500 dark:text-gray-400"
                    >
                        Teachers can upload educational content with scheduling
                        and preview support.
                    </p>

                </div>

                {/* Card 2 */}
                <div
                    className="rounded-2xl border border-gray-200 bg-white p-6
        transition hover:-translate-y-1 hover:shadow-md
        dark:border-white/[0.05] dark:bg-white/[0.03]"
                >

                    <div
                        className="mb-4 flex h-12 w-12 items-center justify-center
            rounded-xl bg-yellow-100 dark:bg-yellow-500/20"
                    >

                        {/* Approval Icon */}
                        <svg
                            className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                    </div>

                    <h3
                        className="text-lg font-semibold text-gray-800
            dark:text-white/90"
                    >
                        Approval Workflow
                    </h3>

                    <p
                        className="mt-3 text-sm leading-6
            text-gray-500 dark:text-gray-400"
                    >
                        Principals can review, approve, or reject uploaded content
                        with proper moderation.
                    </p>

                </div>

                {/* Card 3 */}
                <div
                    className="rounded-2xl border border-gray-200 bg-white p-6
        transition hover:-translate-y-1 hover:shadow-md
        dark:border-white/[0.05] dark:bg-white/[0.03]"
                >

                    <div
                        className="mb-4 flex h-12 w-12 items-center justify-center
            rounded-xl bg-green-100 dark:bg-green-500/20"
                    >

                        {/* Broadcast Icon */}
                        <svg
                            className="h-6 w-6 text-green-600 dark:text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 2h2a2 2 0 002-2V10a2 2 0 00-2-2H9m-4 8h.01M5 16h.01M5 12h.01M5 8h.01"
                            />
                        </svg>

                    </div>

                    <h3
                        className="text-lg font-semibold text-gray-800
            dark:text-white/90"
                    >
                        Public Live Broadcast
                    </h3>

                    <p
                        className="mt-3 text-sm leading-6
            text-gray-500 dark:text-gray-400"
                    >
                        Students can access approved live educational content
                        without authentication.
                    </p>

                </div>

            </section>

        </div>
    );
}