"use client";

// Simple centered showcase section: eyebrow line, headline, subtext,
// and a large native video player. Layout style loosely inspired by a
// screenshot of another company's live marketing site, but their
// specific copy, claims, and "as seen in" press-logo strip weren't
// reused — copy here is the user's own; the press strip is left out
// since there are no real press mentions to show yet.
//
// VIDEO: no real file available yet — using the team photo as the
// poster/thumbnail. Swap `src` below once a real video is uploaded.

export default function FounderVideo() {
  return (
    <section className="fv-section">
      <div className="fv-eyebrow">From our founders</div>
      <h2 className="fv-heading">
        Work that <em>moves sideways</em>.
      </h2>
      <p className="fv-sub">
        Scroll through a few of the things Penaxis has been building lately.
      </p>

      <div className="fv-video-wrap">
        <video
          controls
          poster="/images/hero/team-huddle.jpg"
          preload="metadata"
        >
          {/* Swap this src once the real interview video is uploaded */}
          <source src="" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
