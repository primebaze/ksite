"use client";

import { useEffect, useState } from "react";

type Feedback = "loading" | "opening" | null;

function linkFor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  const link = target.closest("a");
  return link instanceof HTMLAnchorElement ? link : null;
}

function pressTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest("a,button") as HTMLElement | null;
}

function feedbackFor(link: HTMLAnchorElement | null): Feedback {
  if (!link) return null;
  const href = link.getAttribute("href") ?? "";
  if (!href || href.startsWith("#")) return null;
  if (href.startsWith("/") && !link.hasAttribute("target")) return "loading";
  return "opening";
}

export function NavigationFeedback() {
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let pressTimer: ReturnType<typeof setTimeout> | undefined;
    let pressed: HTMLElement | null = null;

    const show = (kind: Feedback, duration = 2500) => {
      if (!kind) return;
      setFeedback(kind);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setFeedback(null), duration);
    };
    const clearPressed = () => {
      if (pressTimer) clearTimeout(pressTimer);
      if (pressed) {
        delete pressed.dataset.pressed;
        pressed = null;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      clearPressed();
      pressed = pressTarget(event.target);
      if (pressed) {
        pressed.dataset.pressed = "true";
        pressTimer = setTimeout(clearPressed, 650);
      }
      const kind = feedbackFor(linkFor(event.target));
      show(kind, kind === "opening" ? 1400 : 2500);
    };
    const onClick = (event: MouseEvent) => {
      const kind = feedbackFor(linkFor(event.target));
      show(kind, kind === "opening" ? 1400 : 2500);
      window.setTimeout(clearPressed, 160);
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (form instanceof HTMLFormElement) {
        form.querySelectorAll("button").forEach((button) => {
          button.dataset.pending = "true";
        });
      }
      show("loading");
    };
    const stop = () => {
      if (timer) clearTimeout(timer);
      setFeedback(null);
      clearPressed();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    window.addEventListener("pointerup", clearPressed, true);
    window.addEventListener("pointercancel", clearPressed, true);
    window.addEventListener("pageshow", stop);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("pointerup", clearPressed, true);
      window.removeEventListener("pointercancel", clearPressed, true);
      window.removeEventListener("pageshow", stop);
      if (timer) clearTimeout(timer);
      clearPressed();
    };
  }, []);

  if (!feedback) return null;

  return (
    <>
      {feedback === "loading" && (
        <div className="fixed inset-x-0 top-0 z-[9999] h-1 overflow-hidden bg-emerald-400/15">
          <div className="h-full w-1/2 animate-[nav-progress_900ms_ease-in-out_infinite] rounded-full bg-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.9)]" />
        </div>
      )}
      <div className="fixed bottom-5 left-1/2 z-[9999] -translate-x-1/2 rounded-full border border-white/10 bg-black/85 px-4 py-2 text-xs font-medium text-white shadow-2xl backdrop-blur">
        {feedback === "opening" ? "Opening…" : "Loading…"}
      </div>
    </>
  );
}
