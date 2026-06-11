import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
