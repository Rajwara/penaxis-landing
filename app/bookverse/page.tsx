import type { Metadata } from "next";
import BookVerseApp from "@/components/BookVerseApp";

export const metadata: Metadata = {
  title: "BookVerse",
  description: "A gamified reading platform demo.",
};

export default function BookVersePage() {
  return <BookVerseApp />;
}
