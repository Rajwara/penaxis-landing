import type { Metadata } from "next";
import PortfolioDemo from "@/components/PortfolioDemo";

// Internal component sandbox, not a real content page - kept out of search.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestingPage() {
  return (
    <div>
      <PortfolioDemo />
      <a href="/" className="tst-back">
        ← Back to Penaxis
      </a>
    </div>
  );
}
