"use client";

import type { ReactNode } from "react";

// A submit button that asks for confirmation before submitting its form. Used
// for destructive bulk actions (e.g. delete selected accounts).
export function ConfirmSubmit({
  children,
  className,
  message,
}: {
  children: ReactNode;
  className?: string;
  message: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
