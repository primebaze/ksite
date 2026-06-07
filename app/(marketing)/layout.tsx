import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
