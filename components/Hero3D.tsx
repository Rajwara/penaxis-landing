"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Signature element: the "Growth Axis" — a core representing Penaxis
// (pen + axis) with three orbiting rings of nodes, one per core service
// pillar. Built in vanilla Three.js, reacts to cursor position and
// gently rotates on its own — an abstract reading of the brand's own
// orbit-ring motif used throughout their materials.

const NODE_COLORS = [0x6339e0, 0xf2662b, 0xd6f23c];

function makeGlowTexture() {
  const size = 128;
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
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Core: wireframe icosahedron, the "axis"
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x6339e0,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const coreSolidMat = new THREE.MeshBasicMaterial({
      color: 0x241558,
      transparent: true,
      opacity: 0.12,
    });
    const coreSolid = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.13, 1),
      coreSolidMat
    );
    group.add(coreSolid);

    const glowTex = makeGlowTexture();

    // Orbit rings + nodes
    const rings: {
      pivot: THREE.Group;
      speed: number;
      nodes: THREE.Sprite[];
    }[] = [];

    const ringConfigs = [
      { radius: 2.1, tilt: 0.15, count: 4, speed: 0.09 },
      { radius: 2.85, tilt: -0.35, count: 5, speed: -0.065 },
      { radius: 3.5, tilt: 0.55, count: 3, speed: 0.045 },
    ];

    ringConfigs.forEach((cfg, ringIdx) => {
      const pivot = new THREE.Group();
      pivot.rotation.x = cfg.tilt;
      pivot.rotation.z = ringIdx * 0.4;
      group.add(pivot);

      // Faint ring line
      const ringCurve = new THREE.EllipseCurve(0, 0, cfg.radius, cfg.radius);
      const points = ringCurve.getPoints(96);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x6339e0,
        transparent: true,
        opacity: 0.18,
      });
      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      ringLine.rotation.x = Math.PI / 2;
      pivot.add(ringLine);

      const nodes: THREE.Sprite[] = [];
      for (let i = 0; i < cfg.count; i++) {
        const angle = (i / cfg.count) * Math.PI * 2;
        const color = NODE_COLORS[(ringIdx + i) % NODE_COLORS.length];
        const spriteMat = new THREE.SpriteMaterial({
          map: glowTex,
          color,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const sprite = new THREE.Sprite(spriteMat);
        const scale = 0.34 + (ringIdx === 0 ? 0.12 : 0);
        sprite.scale.set(scale, scale, scale);
        sprite.position.set(
          Math.cos(angle) * cfg.radius,
          0,
          Math.sin(angle) * cfg.radius
        );
        sprite.rotation.x = Math.PI / 2;
        pivot.add(sprite);
        nodes.push(sprite);
      }

      rings.push({ pivot, speed: cfg.speed, nodes });
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // Pointer parallax target
    const pointer = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    function handlePointerMove(e: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
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

    function animate() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (!prefersReduced) {
        core.rotation.y += delta * 0.18;
        core.rotation.x += delta * 0.06;
        coreSolid.rotation.copy(core.rotation);

        rings.forEach((ring, idx) => {
          ring.pivot.rotation.y += delta * ring.speed;
          ring.nodes.forEach((node, i) => {
            const bob = Math.sin(elapsed * 1.2 + idx + i) * 0.05;
            node.position.y = bob;
          });
        });

        targetRotation.y += (pointer.x * 0.35 - targetRotation.y) * 0.04;
        targetRotation.x += (-pointer.y * 0.2 - targetRotation.x) * 0.04;
        group.rotation.y = targetRotation.y;
        group.rotation.x = targetRotation.x;
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
      coreGeo.dispose();
      coreMat.dispose();
      coreSolidMat.dispose();
      rings.forEach((ring) => {
        ring.nodes.forEach((n) => {
          (n.material as THREE.SpriteMaterial).dispose();
        });
      });
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
