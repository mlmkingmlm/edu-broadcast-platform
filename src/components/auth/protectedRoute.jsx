"use client";

import { useRouter } from "next/navigation";

import {
    useEffect,
    useState,
} from "react";

export default function ProtectedRoute({
    children,
    allowedRole,
}) {

    const router =
        useRouter();

    const [isChecking, setIsChecking] =
        useState(true);

    const [isAuthorized, setIsAuthorized] =
        useState(false);

    useEffect(() => {

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        // Not Logged In
        if (!user) {

            router.replace("/signin");

            return;

        }

        // Wrong Role
        if (
            allowedRole
            &&
            user.role !== allowedRole
        ) {

            router.replace("/signin");

            return;

        }

        // Authorized
        setIsAuthorized(true);

        setIsChecking(false);

    }, [
        router,
        allowedRole,
    ]);

    // Loading State
    if (isChecking) {

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

    // Block Unauthorized Render
    if (!isAuthorized) {
        return null;
    }

    return children;

}