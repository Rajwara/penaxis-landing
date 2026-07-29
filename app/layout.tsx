import type { Metadata } from "next";
import "./globals.css";
import CuboidLoader from "@/components/CuboidLoader";

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
        <CuboidLoader />
        {children}
      </body>
    </html>
  );
}
