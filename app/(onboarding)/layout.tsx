import type { ReactNode } from "react";

// Focused onboarding shell — no marketing header/footer, so each step fills the
// screen as its own page.
export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-black font-sans text-white antialiased">{children}</div>;
}
