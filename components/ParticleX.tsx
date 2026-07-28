"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Signature moment: the Penaxis "X" mark, exploded into a particle
// cloud. The whole form turns toward wherever the cursor moves —
// dragging your eye and the brand mark in the same direction.

function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

// Sample a bold "X" glyph rendered to an offscreen canvas into a set
// of normalized (x, y) points in the range roughly [-1, 1].
function sampleXPoints(targetCount: number) {
  const res = 512;
  const canvas = document.createElement("canvas");
  canvas.width = res;
  canvas.height = res;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, res, res);
  ctx.fillStyle = "#fff";
  ctx.font = `900 ${res * 0.82}px "Space Grotesk", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("X", res / 2, res / 2 + res * 0.04);

  const data = ctx.getImageData(0, 0, res, res).data;
  const candidates: { x: number; y: number }[] = [];
  const step = 3;
  for (let y = 0; y < res; y += step) {
    for (let x = 0; x < res; x += step) {
      const alpha = data[(y * res + x) * 4 + 3];
      if (alpha > 120) {
        candidates.push({
          x: (x / res) * 2 - 1,
          y: -((y / res) * 2 - 1),
        });
      }
    }
  }

  // Shuffle and trim/pad to targetCount
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < targetCount; i++) {
    points.push(candidates[i % candidates.length]);
  }
  return points;
}

export default function ParticleX() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const POINT_COUNT = 5200;
    const samples = sampleXPoints(POINT_COUNT);

    const positions = new Float32Array(POINT_COUNT * 3);
    const homePositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const seeds = new Float32Array(POINT_COUNT);

    const violet = new THREE.Color(0x9c86f5);
    const white = new THREE.Color(0xf3f0ff);
    const ember = new THREE.Color(0xff8a4c);

    for (let i = 0; i < POINT_COUNT; i++) {
      const p = samples[i];
      const scale = 2.5;
      const depth = (Math.random() - 0.5) * 0.5;
      const x = p.x * scale;
      const y = p.y * scale;
      const z = depth;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      homePositions[i * 3] = x;
      homePositions[i * 3 + 1] = y;
      homePositions[i * 3 + 2] = z;

      const mixT = Math.random();
      const base =
        mixT < 0.75
          ? violet.clone().lerp(white, (mixT / 0.75) * 0.6)
          : violet.clone().lerp(ember, (mixT - 0.75) / 0.25);
      colors[i * 3] = base.r;
      colors[i * 3 + 1] = base.g;
      colors[i * 3 + 2] = base.b;

      seeds[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const glowTex = makeGlowTexture();
    const material = new THREE.PointsMaterial({
      size: 0.028,
      map: glowTex,
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    // Pointer state: normalized -1..1 across the whole viewport section
    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      pointer.x = relX * 2 - 1;
      pointer.y = relY * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove);

    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;

    function animate() {
      const elapsed = clock.getElapsedTime();

      if (!prefersReduced) {
        // Turn the whole cloud toward the cursor — the core interaction
        current.x += (pointer.x - current.x) * 0.045;
        current.y += (pointer.y - current.y) * 0.045;
        group.rotation.y = current.x * 0.9;
        group.rotation.x = -current.y * 0.5;

        // Gentle per-point drift so the cloud feels alive, not static
        for (let i = 0; i < POINT_COUNT; i++) {
          const seed = seeds[i];
          const hx = homePositions[i * 3];
          const hy = homePositions[i * 3 + 1];
          const hz = homePositions[i * 3 + 2];
          posAttr.array[i * 3] = hx + Math.sin(elapsed * 0.6 + seed) * 0.012;
          posAttr.array[i * 3 + 1] =
            hy + Math.cos(elapsed * 0.5 + seed) * 0.012;
          posAttr.array[i * 3 + 2] = hz + Math.sin(elapsed * 0.4 + seed) * 0.03;
        }
        posAttr.needsUpdate = true;

        points.rotation.z = Math.sin(elapsed * 0.15) * 0.03;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      glowTex.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      role="presentation"
    />
  );
}
