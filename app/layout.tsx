import type { Metadata } from "next";
import "./globals.css";
// import CuboidLoader from "@/components/CuboidLoader"; // temporarily disabled per client request
// import CookieConsent from "@/components/CookieConsent"; // temporarily disabled per client request
import ScrollToTop from "@/components/ScrollToTop";
import QuickQuote from "@/components/QuickQuote";
import StoreLocator from "@/components/StoreLocator";

export const metadata: Metadata = {
  title: "Penaxis — Growth & Technology Partner",
  description:
    "Penaxis combines AI, software development, digital strategy, and sales expertise to help businesses operate smarter and grow faster.",
  metadataBase: new URL("https://www.penaxis.com"),
  openGraph: {
    title: "Penaxis — Growth & Technology Partner",
    description:
      "From websites and CRMs to MVPs and sales pipelines, we help businesses scale smarter.",
    url: "https://www.penaxis.com",
    siteName: "Penaxis",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        {/* CuboidLoader temporarily disabled per client request — re-enable by uncommenting */}
        {/* <CuboidLoader /> */}
        {children}
        <ScrollToTop />
        <QuickQuote />
        <StoreLocator />
        {/* CookieConsent temporarily disabled per client request — re-enable by uncommenting this and the import above */}
        {/* <CookieConsent /> */}
      </body>
    </html>
  );
}
