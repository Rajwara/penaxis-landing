"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

// Ported mechanism: a procedurally generated 3D "city" of randomized
// building blocks with wireframe overlays, small triangle "smoke"
// particles orbiting above, and car-like blocks animating back and
// forth through the scene, the whole group gently rotating toward the
// cursor — from a widely-shared Three.js CodePen demo ("Lab City 3D"
// by Victor Vergara). Ported as close to 1:1 as the original code
// (camera, lights, fog range, geometry, particle/car colors all kept
// as-is) — the ONLY color changed is the fog/background itself,
// swapped from the demo's red to the Penaxis violet. Heading text and
// the demo's personal dribbble credit link aren't reused. TweenMax
// calls are replaced with GSAP (its direct successor, same API).

function mathRandom(num = 8) {
  return -Math.random() * num + Math.random() * num;
}

export default function CityScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (width > 800) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    mount.appendChild(renderer.domElement);

    // Original camera parameters, unchanged
    const camera = new THREE.PerspectiveCamera(20, width / height, 1, 500);
    camera.position.set(0, 2, 14);

    const scene = new THREE.Scene();
    const city = new THREE.Object3D();
    const smoke = new THREE.Object3D();
    const town = new THREE.Object3D();

    // ONLY color changed from the original: red (0xF02050) -> Penaxis violet
    const setcolor = 0x734fa0;
    scene.background = new THREE.Color(setcolor);
    scene.fog = new THREE.Fog(setcolor, 10, 16);

    // Buildings — same geometry/material setup as the original
    for (let i = 1; i < 100; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
      const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        wireframe: false,
        side: THREE.DoubleSide,
      });
      const wmaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.03,
        side: THREE.DoubleSide,
      });

      const cube = new THREE.Mesh(geometry, material);
      const wfloor = new THREE.Mesh(geometry, wmaterial);
      const floor = new THREE.Mesh(geometry, material);

      cube.add(wfloor);
      cube.castShadow = true;
      cube.receiveShadow = true;

      floor.scale.y = 0.05;
      cube.scale.y = 0.1 + Math.abs(mathRandom(8));

      const cubeWidth = 0.9;
      cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
      cube.position.x = Math.round(mathRandom());
      cube.position.z = Math.round(mathRandom());

      floor.position.set(cube.position.x, 0, cube.position.z);

      town.add(floor);
      town.add(cube);
    }

    // Ground plane
    const pmaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      opacity: 0.9,
      transparent: true,
    });
    const pgeometry = new THREE.PlaneGeometry(60, 60);
    const pelement = new THREE.Mesh(pgeometry, pmaterial);
    pelement.rotation.x = (-90 * Math.PI) / 180;
    pelement.position.y = -0.001;
    pelement.receiveShadow = true;
    city.add(pelement);

    // Particles ("smoke") — original yellow, unchanged
    const gmaterial = new THREE.MeshToonMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const gparticular = new THREE.CircleGeometry(0.01, 3);
    for (let h = 1; h < 300; h++) {
      const particular = new THREE.Mesh(gparticular, gmaterial);
      particular.position.set(mathRandom(5), mathRandom(5), mathRandom(5));
      particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
      smoke.add(particular);
    }

    // Cars — original yellow, unchanged
    let createCarPos = true;
    const createCars = (cScale = 2, cPos = 20, cColor = 0xffff00) => {
      const cMat = new THREE.MeshToonMaterial({ color: cColor, side: THREE.DoubleSide });
      const cGeo = new THREE.BoxGeometry(1, cScale / 40, cScale / 40);
      const cElem = new THREE.Mesh(cGeo, cMat);
      const cAmp = 3;

      if (!prefersReduced) {
        if (createCarPos) {
          createCarPos = false;
          cElem.position.x = -cPos;
          cElem.position.z = mathRandom(cAmp);
          gsap.to(cElem.position, { x: cPos, duration: 3, repeat: -1, yoyo: true, delay: Math.abs(mathRandom(3)) });
        } else {
          createCarPos = true;
          cElem.position.x = mathRandom(cAmp);
          cElem.position.z = -cPos;
          cElem.rotation.y = (90 * Math.PI) / 180;
          gsap.to(cElem.position, {
            z: cPos,
            duration: 5,
            repeat: -1,
            yoyo: true,
            delay: Math.abs(mathRandom(3)),
            ease: "power1.inOut",
          });
        }
      }
      cElem.receiveShadow = true;
      cElem.castShadow = true;
      cElem.position.y = Math.abs(mathRandom(5));
      city.add(cElem);
    };
    for (let i = 0; i < 60; i++) {
      createCars(0.1, 20);
    }

    // Lights — original intensities/colors, unchanged
    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    const lightFront = new THREE.SpotLight(0xffffff, 20, 10);
    const lightBack = new THREE.PointLight(0xffffff, 0.5);
    lightFront.rotation.x = (45 * Math.PI) / 180;
    lightFront.rotation.z = (-45 * Math.PI) / 180;
    lightFront.position.set(5, 5, 5);
    lightFront.castShadow = true;
    lightFront.shadow.mapSize.width = 2048;
    lightFront.shadow.mapSize.height = 2048;
    lightFront.penumbra = 0.1;
    lightBack.position.set(0, 6, 0);

    smoke.position.y = 2;

    scene.add(ambientLight);
    city.add(lightFront);
    scene.add(lightBack);
    scene.add(city);
    city.add(smoke);
    city.add(town);

    const gridHelper = new THREE.GridHelper(60, 120, 0xff0000, 0x000000);
    city.add(gridHelper);

    // Mouse parallax
    const mouse = new THREE.Vector2();
    const uSpeed = 0.001;
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener("mousemove", onMouseMove);

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
      raf = requestAnimationFrame(animate);

      if (!prefersReduced) {
        city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
        city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;
        if (city.rotation.x < -0.05) city.rotation.x = -0.05;
        else if (city.rotation.x > 1) city.rotation.x = 1;

        smoke.rotation.y += 0.01;
        smoke.rotation.x += 0.01;
      }

      camera.lookAt(city.position);
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="city-scene-root" aria-label="Penaxis">
      <div ref={mountRef} className="city-scene-canvas-mount" aria-hidden="true" role="presentation" />
      <div className="city-scene-overlay">
        <h1>Growth, Engineered.</h1>
        <p>— Human expertise, AI-scale execution —</p>
      </div>
    </section>
  );
}
