"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

// Submit button that disables itself and shows a pending label while its form's
// server action is in flight, preventing double-clicks/double-submits.
// Place inside a <form action={…}>.
export function SubmitButton({
  children,
  className,
  pendingText = "Please wait…",
  formAction,
}: {
  children: ReactNode;
  className?: string;
  pendingText?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      formAction={formAction}
      disabled={pending}
      aria-busy={pending}
      className={`${className ?? ""} ${pending ? "cursor-not-allowed opacity-60" : ""}`}
    >
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
