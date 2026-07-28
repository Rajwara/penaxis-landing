"use client";

import { useRef, ReactNode } from "react";

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 22,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${
      (y / rect.height) * strength
    }px)`;
  };

  const handleLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  const Tag: any = href ? "a" : "button";

  return (
    <Tag
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic-btn transition-transform duration-300 ease-out ${className}`}
      style={{ transitionProperty: "transform" }}
    >
      {children}
    </Tag>
  );
}
