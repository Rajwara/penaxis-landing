"use client";

import { useEffect, useRef, useState } from "react";

// Ported mechanism: a raymarched WebGL fragment shader renders a
// morphing signed-distance-field scene (sphere -> torus -> box ->
// octahedron) as a fixed full-screen background, driven by scroll
// position with velocity-based physics, a HUD, scene-dot nav, a
// light/dark theme toggle, and reveal-on-scroll text cards.
//
// The shader itself and the scroll/reveal mechanics are a generic
// raymarching technique — kept intact. The original reference's own
// brand copy (a real studio's "about us" positioning) was not reused;
// everything written here is fresh copy for Penaxis, and colors are
// mapped to the Penaxis palette (ink/paper/violet/volt) instead of
// the reference's own accent.

const VS = `attribute vec2 a; void main(){ gl_Position=vec4(a,0,1); }`;

const FS = `
precision highp float;
uniform vec2 uR;
uniform float uT, uS, uSc, uBl;
uniform vec3 uBg;
uniform vec3 uAccent;

#define TAU 6.2831853

mat2 r2(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

float sphere(vec3 p, float r) { return length(p) - r; }

float torus(vec3 p, vec2 t) {
  vec2 q = vec2(length(p.xz) - t.x, p.y);
  return length(q) - t.y;
}

float box(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.);
}

float octa(vec3 p, float s) {
  p = abs(p);
  return (p.x + p.y + p.z - s) * .5773;
}

float sdf(vec3 p) {
  float t = uT * .25, sc = uSc, bl = uBl;

  float d0 = sphere(p, .65 + .05 * sin(t * 1.3));

  vec3 p1 = p; p1.xz = r2(t * .6) * p1.xz;
  float d1 = torus(p1, vec2(.55, .22));

  vec3 p2 = p; p2.xy = r2(t * .4) * p2.xy; p2.yz = r2(t * .3) * p2.yz;
  float d2 = box(p2, vec3(.42 + .04 * sin(t * 2.)));

  vec3 p3 = p; p3.xy = r2(t * .5) * p3.xy;
  float d3 = octa(p3, .72 + .04 * sin(t * 1.7));

  vec3 p4 = p; p4.xz = r2(t * .7) * p4.xz;
  float d4a = torus(p4, vec2(.45, .15));
  vec3 p5 = p; p5.xy = r2(t * .5 + 1.2) * p5.xy;
  float d4b = torus(p5, vec2(.35, .12));
  float d4 = min(d4a, d4b);

  if (sc < 1.) return mix(d0, d1, bl);
  if (sc < 2.) return mix(d1, d2, bl);
  if (sc < 3.) return mix(d2, d3, bl);
  return mix(d3, d4, bl);
}

vec3 norm(vec3 p) {
  float e = .001;
  return normalize(vec3(
    sdf(p + vec3(e,0,0)) - sdf(p - vec3(e,0,0)),
    sdf(p + vec3(0,e,0)) - sdf(p - vec3(0,e,0)),
    sdf(p + vec3(0,0,e)) - sdf(p - vec3(0,0,e))
  ));
}

vec3 pal(float t) {
  return uAccent * (.6 + .4 * cos(TAU * (.5 * t)));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - uR * .5) / min(uR.x, uR.y);
  vec3 ro = vec3(0, 0, 2.4);
  vec3 rd = normalize(vec3(uv, -1.2));

  float t = 0., hit = 0.;
  for (int i = 0; i < 96; i++) {
    float d = sdf(ro + rd * t);
    if (d < .001) { hit = 1.; break; }
    if (t > 6.) break;
    t += d;
  }

  vec3 bg = uBg, col = bg;

  if (hit > .5) {
    vec3 p = ro + rd * t;
    vec3 n = norm(p);
    vec3 bc = pal(uS);
    vec3 l = normalize(vec3(.7, 1., .5));
    float dif = clamp(dot(n, l), 0., 1.);
    float spe = pow(clamp(dot(reflect(-l, n), -rd), 0., 1.), 32.);
    float fr  = pow(1. - clamp(dot(-rd, n), 0., 1.), 3.5);
    col = bc * (dif * .7 + .3) + spe * .5 + fr * uAccent * .6;
    col = mix(bg, col, exp(-t * .15));
  }

  col = mix(uBg, col, clamp(1. - dot(uv * .9, uv * .9), 0., 1.));
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(127.1, 311.7))) * 43758.5) - .5) * .025;

  gl_FragColor = vec4(col, 1.);
}`;

const SCENES = [
  { name: "SCENE 01" },
  { name: "SCENE 02" },
  { name: "SCENE 03" },
  { name: "SCENE 04" },
  { name: "SCENE 05" },
];

const hexToVec3 = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const BG_COLORS = { dark: "#171717", light: "#faf9fd" };
const ACCENT_COLORS = { dark: "#d6f23c", light: "#5c3e82" };

export default function CaseStudyExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollElRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeIdx, setActiveIdx] = useState(0);
  const [pct, setPct] = useState(0);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: false });
    if (!gl) {
      canvas.style.background = "#171717";
      return;
    }

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS)!);
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS)!);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const ap = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "uR");
    const uTi = gl.getUniformLocation(prog, "uT");
    const uScroll = gl.getUniformLocation(prog, "uS");
    const uScene = gl.getUniformLocation(prog, "uSc");
    const uBlend = gl.getUniformLocation(prog, "uBl");
    const uBg = gl.getUniformLocation(prog, "uBg");
    const uAccent = gl.getUniformLocation(prog, "uAccent");

    const setBg = (t: "dark" | "light") => {
      const [r, g, b] = hexToVec3(BG_COLORS[t]);
      gl.uniform3f(uBg, r, g, b);
      const [ar, ag, ab] = hexToVec3(ACCENT_COLORS[t]);
      gl.uniform3f(uAccent, ar, ag, ab);
    };
    setBg("dark");

    let maxScroll = 1;
    const sections = Array.from(
      scrollElRef.current!.querySelectorAll<HTMLElement>("section")
    );
    const N = sections.length;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uR, canvas.width, canvas.height);
      maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    };
    resize();
    window.addEventListener("resize", resize);

    let tgt = 0;
    let smooth = 0;
    let velocity = 0;
    const ease = 0.1;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onScroll = () => {
      tgt = maxScroll > 0 ? scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onWheel = (e: WheelEvent) => {
      if (prefersReduced) return;
      e.preventDefault();
      const linePx = 16;
      const pagePx = innerHeight * 0.9;
      const delta =
        e.deltaMode === 1 ? e.deltaY * linePx : e.deltaMode === 2 ? e.deltaY * pagePx : e.deltaY;
      velocity += delta;
      velocity = Math.max(-600, Math.min(600, velocity));
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    const updateHUD = (s: number) => {
      const p = Math.round(s * 100);
      setPct(p);
      const si = Math.min(N - 1, Math.floor(s * N));
      setActiveIdx(si);
    };

    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".cs-tag, .cs-card h1, .cs-card h2, .cs-body, .cs-stat-row, .cs-cta, .cs-hline"
      )
    );
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.92) {
        el.classList.add("is-visible");
      }
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));

    let anchorAnim = 0;
    const stopAnchorAnim = () => {
      if (anchorAnim) cancelAnimationFrame(anchorAnim);
      anchorAnim = 0;
    };
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const smoothScrollToY = (targetY: number, duration = 900) => {
      stopAnchorAnim();
      velocity = 0;
      const startY = window.scrollY;
      const diff = targetY - startY;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        window.scrollTo(0, startY + diff * easeInOutCubic(p));
        if (p < 1) anchorAnim = requestAnimationFrame(tick);
        else anchorAnim = 0;
      };
      anchorAnim = requestAnimationFrame(tick);
    };
    window.addEventListener("wheel", stopAnchorAnim, { passive: true });
    window.addEventListener("touchstart", stopAnchorAnim, { passive: true });
    window.addEventListener("mousedown", stopAnchorAnim, { passive: true });
    window.addEventListener("keydown", stopAnchorAnim);

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a[href^="#cs-s"]') as HTMLAnchorElement | null;
      if (!a) return;
      e.preventDefault();
      const id = a.getAttribute("href")!;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      const y = Math.max(0, Math.min(el.offsetTop, maxScroll));
      smoothScrollToY(y);
    };
    document.addEventListener("click", onAnchorClick);

    const t0 = performance.now();
    let lastNow = t0;
    let rafId = 0;
    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;

      if (!prefersReduced) {
        velocity *= Math.pow(0.85, dt * 60);
        if (Math.abs(velocity) > 0.2) {
          window.scrollBy({ top: velocity * ease, behavior: "auto" });
        }
        smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));
      } else {
        smooth = tgt;
      }

      const raw = smooth * (N - 1);
      const flr = Math.floor(raw);
      const si = Math.min(flr, N - 2);
      const bl = flr >= N - 1 ? 1.0 : raw - flr;

      updateHUD(smooth);

      gl.uniform1f(uTi, (now - t0) / 1000);
      gl.uniform1f(uScroll, smooth);
      gl.uniform1f(uScene, si);
      gl.uniform1f(uBlend, bl);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    rafId = requestAnimationFrame(frame);

    (canvas as any)._setBg = setBg;

    return () => {
      cancelAnimationFrame(rafId);
      stopAnchorAnim();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("wheel", stopAnchorAnim);
      window.removeEventListener("touchstart", stopAnchorAnim);
      window.removeEventListener("mousedown", stopAnchorAnim);
      window.removeEventListener("keydown", stopAnchorAnim);
      document.removeEventListener("click", onAnchorClick);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    if (canvas?._setBg) canvas._setBg(theme);
  }, [theme]);

  return (
    <div className="cs-root" data-cs-theme={theme}>
      <canvas ref={canvasRef} className="cs-canvas" />

      <div className="cs-hud" aria-hidden="true">
        <div>{String(pct).padStart(3, "0")}%</div>
        <div className="cs-progress-bar">
          <div className="cs-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="cs-scene-label">{SCENES[activeIdx]?.name}</div>
      </div>

      <div className="cs-strip" role="group" aria-label="Section indicators" aria-hidden="true">
        {SCENES.map((_, i) => (
          <div key={i} className={`cs-dot ${i === activeIdx ? "is-active" : ""}`} />
        ))}
      </div>

      <button
        type="button"
        className="cs-theme-toggle"
        aria-label="Toggle light/dark mode"
        onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      >
        <svg className="cs-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        <svg className="cs-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
        </svg>
      </button>

      <div ref={scrollElRef} className="cs-scroll">
        <section id="cs-s0" className="cs-section">
          <div className="cs-card cs-center">
            <div className="cs-tag">Case Studies — Penaxis</div>
            <h1>ENGINEERED
              <br />
              OUTCOMES</h1>
            <p className="cs-body">
              Scroll to explore how we approach a project — from the first
              conversation to the system that's still running long after
              launch.
            </p>
            <a className="cs-cta" href="#cs-s1">
              Continue
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </a>
          </div>
        </section>

        <section id="cs-s1" className="cs-section">
          <div className="cs-card cs-right">
            <div className="cs-hline" />
            <div className="cs-tag">01 — Approach</div>
            <h2>WHAT WE
              <br />
              ACTUALLY DO</h2>
            <p className="cs-body">
              AI-powered products, digital transformation, fractional sales
              motion, and the web/CRM/software systems that hold it all
              together. Every engagement starts with the same question:
              what result actually moves the business.
            </p>
            <div className="cs-stat-row" style={{ justifyContent: "flex-end" }}>
              <div className="cs-stat">
                <span className="cs-stat-num">4</span>
                <span className="cs-stat-label">Service lines</span>
              </div>
              <div className="cs-stat">
                <span className="cs-stat-num">50+</span>
                <span className="cs-stat-label">Launched</span>
              </div>
              <div className="cs-stat">
                <span className="cs-stat-num">1</span>
                <span className="cs-stat-label">Team</span>
              </div>
            </div>
          </div>
        </section>

        <section id="cs-s2" className="cs-section">
          <div className="cs-card">
            <div className="cs-hline" />
            <div className="cs-tag">02 — Work</div>
            <h2>WHERE WE
              <br />
              SHOW UP</h2>
            <p className="cs-body">
              AI-powered MVPs, digital transformation programs, fractional
              sales and growth engagements, and the web, CRM, and software
              systems underneath them all.
            </p>
            <a className="cs-cta" href="#cs-s3">
              Continue
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </a>
          </div>
        </section>

        <section id="cs-s3" className="cs-section">
          <div className="cs-card cs-center">
            <div className="cs-hline" />
            <div className="cs-tag">03 — Process</div>
            <h2>BUILD,
              <br />
              THEN PROVE IT</h2>
            <p className="cs-body">
              We scope tight, ship something real fast, and measure against
              the outcome we agreed on up front — not just whether it
              shipped, but whether it worked.
            </p>
          </div>
        </section>

        <section id="cs-s4" className="cs-section">
          <div className="cs-card cs-right">
            <div className="cs-hline" />
            <div className="cs-tag">04 — Contact</div>
            <h2>LET'S
              <br />
              BUILD ONE</h2>
            <p className="cs-body">
              Tell us what you're working on, and we'll tell you honestly
              whether — and how — we'd approach it.
            </p>
            <a className="cs-cta" href="/#contact">
              Start a project
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
