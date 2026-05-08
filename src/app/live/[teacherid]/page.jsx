"use client";

import React, {
    useEffect,
    useState,
} from "react";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
    getLiveContents,
} from "@/services/content.services";

export default function LivePage() {

    const params = useParams();

    const teacherId =
        parseInt(params.teacherid);

    const [contents, setContents] = useState([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    // Load Approved Content
    useEffect(() => {

        const approvedContents =
            getLiveContents(
                teacherId
            );

        setContents(approvedContents);

    }, []);

    // Auto Rotation
    useEffect(() => {

        if (!contents.length) return;

        const currentContent =
            contents[currentIndex];

        const duration =
            Number(
                currentContent.rotationDuration
            ) || 10;

        const interval = setTimeout(() => {

            setCurrentIndex((prev) =>
                prev === contents.length - 1
                    ? 0
                    : prev + 1
            );

        }, duration * 1000);

        return () => clearTimeout(interval);

    }, [contents, currentIndex]);

    // Empty State
    if (!contents.length) {

        return (
            <div
                className="flex h-screen items-center justify-center
        bg-gray-950 text-white"
            >

                <div className="text-center">

                    <h1 className="text-3xl font-bold">
                        No Live Content
                    </h1>

                    <p className="mt-3 text-gray-400">
                        No approved content available right now.
                    </p>

                    <Link
                        href="/"
                        className="mt-6 inline-flex rounded-xl bg-brand-500 px-5 py-3
            text-sm font-medium text-white hover:bg-brand-600"
                    >
                        Back To Home
                    </Link>

                </div>

            </div>
        );
    }

    // Current Content
    const content =
        contents[currentIndex];

    return (

        <div className="bg-black text-white">

            {/* ================= LIVE SCREEN ================= */}
            <section
                className="relative h-screen w-full overflow-hidden"
            >

                {/* IMAGE */}
                {content.fileType?.startsWith("image") && (
                    <>
                        <img
                            src={content.fileUrl}
                            alt={content.title}
                            className="absolute inset-0 h-full w-full object-cover blur-2xl scale-110 opacity-40"
                        />

                        <img
                            src={content.fileUrl}
                            alt={content.title}
                            className="relative z-10 h-full w-full object-contain"
                        />
                    </>
                )}

                {/* VIDEO */}
                {content.fileType?.startsWith("video") && (
                    <video
                        src={content.fileUrl}
                        autoPlay
                        muted
                        controls
                        className="h-full w-full object-cover"
                    />
                )}

                {/* PDF */}
                {content.fileType?.includes("pdf") && (
                    <iframe
                        src={content.fileUrl}
                        className="h-full w-full bg-white"
                    />
                )}

                {/* TOP BAR */}
                <div
                    className="absolute left-0 top-0 z-50 flex w-full
        items-center justify-between px-6 py-6"
                >

                    <Link
                        href="/"
                        className="rounded-xl bg-white/10 px-4 py-2
          text-sm font-medium backdrop-blur-md"
                    >
                        ← Back To Home
                    </Link>

                    <div
                        className="rounded-full bg-red-500 px-4 py-2
          text-sm font-semibold"
                    >
                        ● LIVE
                    </div>

                </div>

            </section>

            {/* ================= DETAILS SECTION ================= */}
            <section
                className="mx-auto max-w-7xl px-6 py-14"
            >

                {/* Content Info */}
                <div>

                    <h1 className="text-5xl font-bold">
                        {content.title}
                    </h1>

                    <p className="mt-4 max-w-3xl text-lg text-gray-400">
                        {content.description}
                    </p>

                    <div
                        className="mt-5 flex flex-wrap gap-5 text-sm text-gray-400"
                    >
                        <span>
                            📘 Subject: {content.subject}
                        </span>

                        <span>
                            👨‍🏫 Teacher: {content.teacherName}
                        </span>
                    </div>

                </div>

                {/* More Content */}
                <div className="mt-14">

                    <h2
                        className="mb-6 text-2xl font-bold"
                    >
                        More Live Content
                    </h2>

                    <div
                        className="grid grid-cols-1 gap-6
          sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    >

                        {contents.map((item, index) => (

                            <button
                                key={item.id}
                                onClick={() =>
                                    setCurrentIndex(index)
                                }
                                className={`
                overflow-hidden rounded-2xl
                border bg-white/5 text-left
                transition hover:scale-[1.02]
                ${currentIndex === index
                                        ? "border-brand-500"
                                        : "border-white/10"
                                    }
              `}
                            >

                                {/* Thumbnail */}
                                {item.fileType?.startsWith("image") ? (

                                    <img
                                        src={item.fileUrl}
                                        alt={item.title}
                                        className="h-52 w-full object-cover"
                                    />

                                ) : (

                                    <div
                                        className="flex h-52 items-center
                  justify-center bg-white/10"
                                    >
                                        {item.fileType?.startsWith("video")
                                            ? "🎥 Video"
                                            : "📄 PDF"}
                                    </div>

                                )}

                                {/* Info */}
                                <div className="p-4">

                                    <h3
                                        className="line-clamp-1 text-lg font-semibold"
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="mt-2 line-clamp-2
                  text-sm text-gray-400"
                                    >
                                        {item.description}
                                    </p>

                                </div>

                            </button>

                        ))}

                    </div>

                </div>

            </section>

        </div>

    );
}