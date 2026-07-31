import BlobCursorEffect from "@/components/BlobCursorEffect";
import TextRevealMedia from "@/components/TextRevealMedia";

export default function TestingPage() {
  return (
    <div>
      <BlobCursorEffect />
      <TextRevealMedia />

      <a href="/" className="tst-back">
        ← Back to Penaxis
      </a>
    </div>
  );
}
