"use client";
import React, { ReactNode } from "react";
import { Spinner } from "./ui/spinner";

type SaveButtonProps = {
  children: ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

export default function SaveButton({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
}: SaveButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg text-sm px-5 py-2.5 text-white focus:outline-none
        ${
          isLoading || disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-700 cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        }
        ${className}
      `}
    >
      {isLoading && <Spinner />}
      {isLoading ? "Saving..." : children}
    </button>
  );
}
