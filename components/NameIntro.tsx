"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

// Ported from a generic "planet + particle field" three.js pattern
// (a common personal-portfolio name-card technique) — an inner
// icosahedron, an outer wireframe icosahedron shell, and 1000 tiny
// tetrahedrons scattered in a sphere around them, each rotating at a
// different rate. The original used a `shading:` material property
// that was removed from three.js years ago; ported here using the
// modern `flatShading: true` equivalent. Colors nudged toward the
// Penaxis dark/violet palette; the placeholder name text is replaced
// with the Penaxis wordmark.

export default function NameIntro() {
  const mountRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();

    const fov = 75;
    const aspect = mount.clientWidth / mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 10000);
    camera.position.z = 500;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const circle = new THREE.Object3D();
    const skeleton = new THREE.Object3D();
    const particleGroup = new THREE.Object3D();
    scene.add(circle);
    scene.add(skeleton);
    scene.add(particleGroup);

    const geometry = new THREE.TetrahedronGeometry(2, 1);
    const geomInner = new THREE.IcosahedronGeometry(7, 1);
    const geomOuter = new THREE.IcosahedronGeometry(15, 4);

    const material = new THREE.MeshPhongMaterial({
      color: 0x3a2f52,
      flatShading: true,
    });
    const matOuter = new THREE.MeshPhongMaterial({
      color: 0x5c3e82,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const matParticle = new THREE.MeshPhongMaterial({
      color: 0x2e1f42,
      side: THREE.DoubleSide,
      wireframe: true,
    });

    for (let i = 0; i < 1000; i++) {
      const mesh = new THREE.Mesh(geometry, matParticle);
      mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
      mesh.position.multiplyScalar(90 + Math.random() * 900);
      mesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      particleGroup.add(mesh);
    }

    const innerPlanet = new THREE.Mesh(geomInner, material);
    innerPlanet.scale.setScalar(16);
    circle.add(innerPlanet);

    const outerPlanet = new THREE.Mesh(geomOuter, matOuter);
    outerPlanet.scale.setScalar(11);
    skeleton.add(outerPlanet);

    const ambientLight = new THREE.AmbientLight(0xd4d4d4);
    scene.add(ambientLight);

    const dLight0 = new THREE.DirectionalLight(0xffffff, 1);
    dLight0.position.set(1, 0, 0);
    const dLight1 = new THREE.DirectionalLight(0xb49fda, 1);
    dLight1.position.set(0.75, 1, 0.5);
    const dLight2 = new THREE.DirectionalLight(0xfc6607, 0.5);
    dLight2.position.set(-0.75, -1, 0.5);
    scene.add(dLight0, dLight1, dLight2);

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let raf = 0;
    function animate() {
      if (!prefersReduced) {
        particleGroup.rotation.y -= 0.003;
        particleGroup.rotation.z -= 0.0015;
        circle.rotation.x -= 0.002;
        circle.rotation.y -= 0.002;
        skeleton.rotation.x += 0.003;
        skeleton.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      geomInner.dispose();
      geomOuter.dispose();
      material.dispose();
      matOuter.dispose();
      matParticle.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // "Go and come" breathing motion on the wordmark — gently scales up
  // and back down, looping forever.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !textRef.current) return;

    const tween = gsap.to(textRef.current, {
      scale: 1.08,
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="ni-root" aria-label="Penaxis">
      <div ref={mountRef} className="ni-canvas" aria-hidden="true" role="presentation" />
      <div className="ni-name">
        <div ref={textRef} className="ni-name-text">PENAXIS</div>
      </div>
    </section>
  );
}
