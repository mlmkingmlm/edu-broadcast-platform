"use client";

import React, { useEffect, useRef } from "react";

export default function Modal({
  isOpen,
  onClose,
  className = "",
  children,
  showCloseButton = true,
  isFullscreen = false,
}) {

  const modalRef = useRef(null);

  // ESC Close
  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === "Escape") {
        onClose();
      }

    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };

  }, [isOpen, onClose]);

  // Body Scroll Lock
  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };

  }, [isOpen]);

  if (!isOpen) return null;

  const contentClasses = isFullscreen
    ? "w-full h-full"
    : "relative w-full rounded-2xl border shadow-2xl";

  return (
    <div
      className="modal fixed inset-0 z-99999 flex items-center justify-center overflow-y-auto"
    >

      {/* Backdrop */}
      {!isFullscreen && (

        <div
          className="fixed inset-0 h-full w-full bg-black/40 backdrop-blur-[3px]"
          onClick={onClose}
        />

      )}

      {/* Content */}
      <div
        ref={modalRef}
        className={`${contentClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        {showCloseButton && (

          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >

            ✕

          </button>

        )}

        {children}

      </div>

    </div>
  );
}