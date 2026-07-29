"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-ignore - no bundled types for these packages
import loadFont from "load-bmfont";
// @ts-ignore
import createGeometry from "three-bmfont-text";
// @ts-ignore
import MSDFShader from "three-bmfont-text/shaders/msdf";

// three-bmfont-text's MSDF shader helper is older code that expects
// THREE to exist as a global (pre-ES-module convention). Expose it,
// browser-only, so that legacy helper works when called.
if (typeof window !== "undefined") {
  (window as any).THREE = (window as any).THREE || THREE;
}

// Ported technique: kinetic typography with Three.js, originally a
// Codrops tutorial by Mario Carrillo (MIT licensed, github.com/
// marioecg/codrops-kinetic-typo) — text is rendered to an offscreen
// texture via a bitmap/MSDF font, then that texture is mapped onto a
// 3D sphere whose fragment shader scrolls/repeats the UVs over time,
// producing a flowing "kinetic" look. Used here as a brief loading
// screen: same mechanism, "PENAXIS" instead of the demo's own word,
// Penaxis brand colors instead of the original blue/black scheme, and
// only the sphere ("Swirl") variant of the original's four geometries
// — a full loader doesn't need all four for a few seconds of screen time.

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
    vec2 repeat = vec2(10., 10.);
    vec2 uv = fract(vUv * repeat + vec2(sin(vUv.y * 1.0) * 4., time));
    vec3 tex = texture2D(uTexture, uv).rgb;
    float depth = vPosition.z / 10.;
    vec3 fragColor = mix(vec3(0.114, 0.078, 0.157), tex, depth); /* ink fog */
    gl_FragColor = vec4(fragColor, 1.);
  }
`;

export default function KineticLoader() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Skip entirely for reduced-motion users — just dismiss immediately
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

    let mesh: THREE.Mesh | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let rt: THREE.WebGLRenderTarget | null = null;
    let rtScene: THREE.Scene | null = null;
    let rtCamera: THREE.PerspectiveCamera | null = null;
    let disposed = false;

    loadFont("/fonts/ArchivoBlack-Regular.fnt", (err: any, font: any) => {
      if (err || disposed) return;

      const fontGeometry = createGeometry({ font, text: "PENAXIS" });

      new THREE.TextureLoader().load("/fonts/ArchivoBlack-Regular.png", (texture) => {
        if (disposed) return;

        const fontMaterial = new THREE.RawShaderMaterial(
          MSDFShader({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
            color: "#f2eefe",
          })
        );

        // Offscreen scene: just the text, rendered to a texture
        rt = new THREE.WebGLRenderTarget(width, height);
        rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        rtCamera.position.z = 2.4;
        rtScene = new THREE.Scene();
        rtScene.background = new THREE.Color("#212121");

        const textMesh = new THREE.Mesh(fontGeometry, fontMaterial);
        textMesh.position.set(-0.94, -0.12, 0);
        textMesh.rotation.set(Math.PI, 0, 0);
        textMesh.scale.set(0.008, 0.04, 1);
        rtScene.add(textMesh);

        // Visible mesh: a sphere whose shader samples the offscreen texture
        const geometry = new THREE.SphereGeometry(12, 64, 64);
        material = new THREE.ShaderMaterial({
          vertexShader: sphereVertex,
          fragmentShader: sphereFragment,
          uniforms: {
            uTime: { value: 0 },
            uTexture: { value: rt.texture },
          },
          side: THREE.DoubleSide,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.onBeforeRender = (r) => {
          r.setRenderTarget(rt!);
          r.render(rtScene!, rtCamera!);
          r.setRenderTarget(null);
        };
        scene.add(mesh);
      });
    });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      rt?.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let raf = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      if (material) material.uniforms.uTime.value = clock.getElapsedTime();
      if (mesh) mesh.rotation.y += 0.003;
      renderer.render(scene, camera);
    }
    animate();

    // Dismiss the loader after a brief moment
    const dismissTimer = setTimeout(() => setFading(true), 1800);
    const removeTimer = setTimeout(() => setHidden(true), 2400);

    return () => {
      disposed = true;
      clearTimeout(dismissTimer);
      clearTimeout(removeTimer);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      rt?.dispose();
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
