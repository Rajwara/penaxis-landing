"use client";

import { useEffect, useRef, useState } from "react";

function IconMuted() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function IconSound() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M18.36 5.64a9 9 0 0 1 0 12.72" />
    </svg>
  );
}

// Full-bleed video banner for the top of the homepage.
// Attempts autoplay WITH sound first. Browsers block audio-with-autoplay
// for most first-time visitors (a hard policy, not something site code can
// override), so this falls back to muted autoplay when the browser rejects
// it — either way the video plays and loops, with a toggle to switch sound
// on/off manually.

export default function VideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play with sound on first. Most browsers will reject this for
    // a first-time visitor (autoplay-with-sound is blocked unless the
    // visitor already has some engagement history with the site) — if so,
    // fall back to muted autoplay so the video still plays.
    video.muted = false;
    video
      .play()
      .then(() => setMuted(false))
      .catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {
          /* Autoplay fully blocked; poster image stays visible */
        });
      });
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
  };

  return (
    <section className="vb-section" aria-label="Penaxis intro video">
      <video
        ref={videoRef}
        className="vb-video"
        src="/videos/homepage-banner.mp4"
        poster="/images/hero/video-banner-poster.jpg"
        loop
        playsInline
        preload="auto"
      />
      <div className="vb-overlay" aria-hidden="true" />

      <button
        type="button"
        onClick={toggleSound}
        className="vb-sound-toggle"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <IconMuted /> : <IconSound />}
        <span>{muted ? "Tap for sound" : "Sound on"}</span>
      </button>
    </section>
  );
}
