"use client";

import React from "react";

import GridShape
  from "@/components/common/GridShape";

import ThemeTogglerTwo
  from "@/components/common/ThemeTogglerTwo";

import {
  ThemeProvider,
} from "@/context/ThemeContext";

import { Toaster }
  from "react-hot-toast";

export default function AuthLayout({
  children,
}) {

  return (

    <div
      className="relative z-1 bg-white
      p-6 dark:bg-gray-900 sm:p-0"
    >

      <ThemeProvider>

        {/* Toast */}
        <Toaster
          position="top-right"
          toastOptions={{

            duration: 3000,

            style: {
              borderRadius: "12px",
              background: "#111827",
              color: "#fff",
            },

          }}
        />

        <div
          className="relative flex h-screen w-full
          flex-col justify-center
          dark:bg-gray-900
          sm:p-0 lg:flex-row"
        >

          {/* Page Content */}
          {children}

          {/* Right Side */}
          <div
            className="hidden h-full w-full
            items-center bg-brand-950
            dark:bg-white/5 lg:grid lg:w-1/2"
          >

            <div
              className="relative z-1 flex
              items-center justify-center"
            >

              {/* Grid Shape */}
              <GridShape />

              <div
                className="flex max-w-xs
                flex-col items-center"
              >

                <h1
                  className="mb-2 w-full text-center
                  text-2xl font-bold text-white"
                >
                  Content Broadcasting System
                </h1>

                <p
                  className="text-center text-gray-400
                  dark:text-white/60"
                >
                  A smart educational platform where
                  teachers upload content, principals
                  manage approvals, and students access
                  live broadcasts seamlessly.
                </p>

              </div>

            </div>

          </div>

          {/* Theme Toggle */}
          <div
            className="fixed bottom-6 right-6
            z-50 hidden sm:block"
          >
            <ThemeTogglerTwo />
          </div>

        </div>

      </ThemeProvider>

    </div>

  );

}