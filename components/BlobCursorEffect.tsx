"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Ported from a Three.js Discourse demo (liquid-blob cursor-masking
// effect: a fullscreen framebuffer accumulates a fading trail wherever
// the pointer moves, and that trail is used in a custom shader to
// "reveal" a 3D model only where the cursor has been).
//
// Adapted from the original standalone-page version (which appended its
// canvas to document.body, sized itself off window.innerWidth/innerHeight,
// and set `body { overflow: hidden }` globally) to be fully scoped to a
// single contained <canvas> inside this component:
//   - sized off the container's own bounding box (ResizeObserver) instead
//     of the window, so it can't affect layout elsewhere on the page
//   - pointer tracking attached to the canvas itself, not `window`, so it
//     only reacts while the cursor is over this section
//   - no global body/document changes at all
//   - full WebGL teardown (dispose geometries/materials/renderer, cancel
//     the render loop, remove listeners) on unmount, so navigating away
//     from /testing leaves nothing running or leaked
//
// Everything else — the render-to-texture trail, the shader math that
// discards helmet fragments outside the revealed area, the wireframe
// overlay — is the same mechanism as the reference.

class Blob {
  fbTexture: { value: THREE.FramebufferTexture };
  rtOutput: THREE.WebGLRenderTarget;
  uniforms: {
    pointer: { value: THREE.Vector2 };
    pointerDown: { value: number };
    pointerRadius: { value: number };
    pointerDuration: { value: number };
  };
  rtScene: THREE.Mesh;
  rtCamera: THREE.Camera;
  renderer: THREE.WebGLRenderer;

  constructor(renderer: THREE.WebGLRenderer, width: number, height: number, gu: any) {
    this.renderer = renderer;
    this.fbTexture = { value: new THREE.FramebufferTexture(width, height) };
    this.rtOutput = new THREE.WebGLRenderTarget(width, height);
    this.uniforms = {
      pointer: { value: new THREE.Vector2().setScalar(10) },
      pointerDown: { value: 1 },
      pointerRadius: { value: 0.375 },
      pointerDuration: { value: 2.5 },
    };

    const rtMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    rtMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.dTime = gu.dTime;
      shader.uniforms.aspect = gu.aspect;
      shader.uniforms.pointer = this.uniforms.pointer;
      shader.uniforms.pointerDown = this.uniforms.pointerDown;
      shader.uniforms.pointerRadius = this.uniforms.pointerRadius;
      shader.uniforms.pointerDuration = this.uniforms.pointerDuration;
      shader.uniforms.fbTexture = this.fbTexture;
      shader.fragmentShader = `
            uniform float dTime;
            uniform float aspect;
            uniform vec2 pointer;
            uniform float pointerDown;
            uniform float pointerRadius;
            uniform float pointerDuration;
            uniform sampler2D fbTexture;
            ${shader.fragmentShader}
          `.replace(
        `#include <color_fragment>`,
        `#include <color_fragment>
            float duration = pointerDuration;
            float rVal = texture2D(fbTexture, vUv).r;
            rVal -= clamp(dTime / duration, 0., 0.1);
            rVal = clamp(rVal, 0., 1.);
            float f = 0.;
            if (pointerDown > 0.5){
              vec2 uv = (vUv - 0.5) * 2. * vec2(aspect, 1.);
              vec2 mouse = pointer * vec2(aspect, 1.);
              f = 1. - smoothstep(pointerRadius * 0.1, pointerRadius, distance(uv, mouse));
            }
            rVal += f * 0.1;
            rVal = clamp(rVal, 0., 1.);
            diffuseColor.rgb = vec3(rVal);
            `
      );
    };
    this.rtScene = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), rtMaterial);
    (this.rtScene.material as any).defines = { USE_UV: "" };
    this.rtCamera = new THREE.Camera();
  }

  render() {
    this.renderer.setRenderTarget(this.rtOutput);
    this.renderer.render(this.rtScene, this.rtCamera);
    this.renderer.copyFramebufferToTexture(new THREE.Vector2(0, 0), this.fbTexture.value as any);
    this.renderer.setRenderTarget(null);
  }

  setSize(w: number, h: number) {
    this.rtOutput.setSize(w, h);
  }

  dispose() {
    this.rtOutput.dispose();
    this.rtScene.geometry.dispose();
    (this.rtScene.material as THREE.Material).dispose();
  }
}

export default function BlobCursorEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;
    let blob: Blob | null = null;
    let helmet: THREE.Object3D | null = null;
    let helmetWire: THREE.Object3D | null = null;
    let head: THREE.Object3D | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    let onPointerLeave: (() => void) | null = null;

    const gu = {
      time: { value: 0 },
      dTime: { value: 0 },
      aspect: { value: 1 },
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1eefb);
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 100);
    camera.position.set(-1, 0, 0).setLength(15);

    (async () => {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const setSize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h || !renderer) return;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        gu.aspect.value = camera.aspect;
        blob?.setSize(w, h);
      };

      blob = new Blob(renderer, container.clientWidth || 1, container.clientHeight || 1, gu);

      onPointerMove = (event: PointerEvent) => {
        const rect = renderer!.domElement.getBoundingClientRect();
        blob!.uniforms.pointer.value.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        blob!.uniforms.pointer.value.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        if (hintRef.current) hintRef.current.style.opacity = "0";
      };
      onPointerLeave = () => {
        blob!.uniforms.pointer.value.setScalar(10);
      };
      renderer.domElement.addEventListener("pointermove", onPointerMove);
      renderer.domElement.addEventListener("pointerleave", onPointerLeave);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enableZoom = false;
      const camShift = new THREE.Vector3(0, 1, 0);
      controls.object.position.add(camShift);
      controls.target.add(camShift);

      const light = new THREE.AmbientLight(0xffffff, Math.PI);
      scene.add(light);
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(3, 4, 5);
      scene.add(dir);

      const loader = new GLTFLoader();

      const headGltf = await loader.loadAsync(
        "https://threejs.org/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb"
      );
      if (disposed) return;
      head = headGltf.scene.children[0];
      (head as any).geometry.rotateY(Math.PI * 0.01);
      (head as any).material = new THREE.MeshMatcapMaterial({ color: 0x8768b7 });
      scene.add(head);

      const helmetGltf = await loader.loadAsync(
        "https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf"
      );
      if (disposed) return;
      helmet = helmetGltf.scene.children[0];
      const helmetMat = (helmet as any).material as THREE.Material;
      helmetMat.onBeforeCompile = (shader) => {
        shader.uniforms.texBlob = { value: blob!.rtOutput.texture };
        shader.vertexShader = `
          varying vec4 vPosProj;
          ${shader.vertexShader}
        `.replace(
          `#include <project_vertex>`,
          `#include <project_vertex>
            vPosProj = gl_Position;
          `
        );
        shader.fragmentShader = `
          uniform sampler2D texBlob;
          varying vec4 vPosProj;
          ${shader.fragmentShader}
        `.replace(
          `#include <clipping_planes_fragment>`,
          `
          vec2 blobUV = ((vPosProj.xy / vPosProj.w) + 1.) * 0.5;
          vec4 blobData = texture(texBlob, blobUV);
          if (blobData.r < 0.01) discard;
          #include <clipping_planes_fragment>
          `
        );
      };
      helmetMat.needsUpdate = true;
      helmet.scale.setScalar(3.5);
      helmet.position.set(0, 1.5, 0.75);
      scene.add(helmet);

      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x212121,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      wireMaterial.onBeforeCompile = (shader) => {
        shader.uniforms.time = gu.time;
        shader.vertexShader = `
              varying float vYVal;
              ${shader.vertexShader}
            `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
                vYVal = position.y;
              `
        );
        shader.fragmentShader = `
              uniform float time;
              varying float vYVal;
              ${shader.fragmentShader}
            `.replace(
          `#include <color_fragment>`,
          `#include <color_fragment>
                float y = fract(vYVal * 0.25 + time * 0.5);
                float fY = smoothstep(0., 0.01, y) - smoothstep(0.02, 0.1, y);
                diffuseColor.a *= fY * 0.9 + 0.1;
              `
        );
      };
      helmetWire = new THREE.Mesh(
        (helmet as any).geometry.clone().rotateX(Math.PI * 0.5),
        wireMaterial
      );
      helmetWire.scale.setScalar(3.5);
      helmetWire.position.set(0, 1.5, 0.75);
      scene.add(helmetWire);

      resizeObserver = new ResizeObserver(() => setSize());
      resizeObserver.observe(container);
      setSize();

      const clock = new THREE.Clock();
      let t = 0;

      renderer.setAnimationLoop(() => {
        if (disposed || !renderer) return;
        const dt = clock.getDelta();
        t += dt;
        gu.time.value = t;
        gu.dTime.value = dt;
        controls!.update();
        blob!.render();
        renderer.render(scene, camera);
      });
    })();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      if (renderer) {
        if (onPointerMove) renderer.domElement.removeEventListener("pointermove", onPointerMove);
        if (onPointerLeave) renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
        renderer.setAnimationLoop(null);
      }
      controls?.dispose();
      blob?.dispose();
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <section className="blob-fx-section">
      <div className="mx-auto max-w-6xl px-6">
        <p className="blob-fx-eyebrow">Just for fun</p>
        <h2 className="blob-fx-heading">Move your cursor to reveal the helmet</h2>
        <div ref={containerRef} className="blob-fx-canvas-wrap">
          <p ref={hintRef} className="blob-fx-hint">
            Move your cursor here
          </p>
        </div>
      </div>
    </section>
  );
}
