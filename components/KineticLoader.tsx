"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Kinetic-typography loader: "PENAXIS" is drawn onto a plain 2D canvas
// (bold system font, no async font/atlas loading required), turned
// into a THREE.CanvasTexture, and mapped onto a rotating sphere whose
// fragment shader continuously scrolls/repeats that texture across
// the surface — the same "flowing text" look as the original
// technique this was based on (a Codrops/marioecg tutorial using
// three-bmfont-text for the text-to-texture step). That library turned
// out to be built for a pre-ES6-class version of Three.js and throws
// ("Class constructor cannot be invoked without 'new'") on the modern
// Three.js version this project uses — so the text-to-texture step is
// done with the plain Canvas 2D API instead, which has no such
// compatibility issue and needs no extra dependencies or font files.

const sphereVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
  }
`;

const sphereFragment = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform sampler2D uTexture;
  void main() {
    float time = uTime * 1.4;
    vec2 repeat = vec2(6., 6.);
    vec2 uv = fract(vUv * repeat + vec2(sin(vUv.y * 1.0) * 4., time));
    vec3 tex = texture2D(uTexture, uv).rgb;
    float depth = vPosition.z / 10.;
    vec3 fragColor = mix(vec3(0.114, 0.078, 0.157), tex, depth); /* ink fog */
    gl_FragColor = vec4(fragColor, 1.);
  }
`;

const SHOW_DURATION_MS = 10000; // fully visible for 10s
const FADE_DURATION_MS = 500;

function makeTextTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // Background fill — becomes the "gap" color between repeated text
  ctx.fillStyle = "#212121";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f2eefe";
  ctx.font = "900 150px 'Arial Black', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PENAXIS", canvas.width / 2, canvas.height / 2 + 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export default function KineticLoader() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHidden(true);
      return;
    }

    const mount = mountRef.current;
    if (!mount) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const texture = makeTextTexture();
    const geometry = new THREE.SphereGeometry(12, 64, 64);
    const material = new THREE.ShaderMaterial({
      vertexShader: sphereVertex,
      fragmentShader: sphereFragment,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture },
      },
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime();
      mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
    }
    animate();

    const dismissTimer = setTimeout(() => setFading(true), SHOW_DURATION_MS);
    const removeTimer = setTimeout(() => setHidden(true), SHOW_DURATION_MS + FADE_DURATION_MS);

    return () => {
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
      aria-hidden="true"
    >
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  );
}
