import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import * as THREE from 'three';

interface Scene3DProps {
  /** Element whose scroll position drives the model rotation. */
  progressRef: RefObject<HTMLElement | null>;
  onReady: () => void;
  onFail: () => void;
}

/**
 * The headphones are built from primitives at runtime rather than loaded as a
 * GLB: nothing to download, the materials match the page palette exactly, and
 * it cannot fail on a slow connection.
 */
function buildHeadphones() {
  const group = new THREE.Group();

  const roseGold = new THREE.MeshPhysicalMaterial({
    color: 0xd9a08c,
    metalness: 0.95,
    roughness: 0.28,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
  });

  const coral = new THREE.MeshPhysicalMaterial({
    color: 0xd25b45,
    metalness: 0.2,
    roughness: 0.55,
    clearcoat: 0.35,
  });

  // Soft fabric for the pads — high roughness, no metal.
  const fabric = new THREE.MeshStandardMaterial({
    color: 0xf0d3ca,
    metalness: 0.0,
    roughness: 0.95,
  });

  const dark = new THREE.MeshStandardMaterial({
    color: 0x2a1f1c,
    metalness: 0.4,
    roughness: 0.5,
  });

  // --- headband: a half torus, squashed slightly to an arch ----------------
  const band = new THREE.Mesh(
    new THREE.TorusGeometry(1.32, 0.115, 28, 120, Math.PI),
    coral
  );
  band.scale.set(1, 1.08, 1);
  group.add(band);

  // Padded inner strip along the band
  const bandPad = new THREE.Mesh(
    new THREE.TorusGeometry(1.2, 0.075, 20, 90, Math.PI * 0.72),
    fabric
  );
  bandPad.rotation.z = Math.PI * 0.14;
  bandPad.scale.set(1, 1.08, 1);
  group.add(bandPad);

  const cupFor = (side: 1 | -1) => {
    const cup = new THREE.Group();

    // vertical slider arm from the band down to the cup
    const arm = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.055, 0.42, 6, 14),
      roseGold
    );
    arm.position.set(side * 1.3, 0.28, 0);
    cup.add(arm);

    // yoke pivot
    const pivot = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 20), dark);
    pivot.position.set(side * 1.3, 0.02, 0);
    cup.add(pivot);

    // outer shell — a flattened capsule reads like a moulded ear cup
    const shell = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.52, 0.16, 12, 32),
      roseGold
    );
    shell.rotation.z = Math.PI / 2;
    shell.rotation.x = Math.PI / 2;
    shell.scale.set(1, 1, 0.86);
    shell.position.set(side * 1.3, -0.42, 0);
    cup.add(shell);

    // accent ring around the shell face
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.44, 0.045, 18, 60),
      coral
    );
    ring.rotation.y = Math.PI / 2;
    ring.position.set(side * 1.44, -0.42, 0);
    cup.add(ring);

    // ear pad facing inward
    const pad = new THREE.Mesh(
      new THREE.TorusGeometry(0.36, 0.16, 20, 48),
      fabric
    );
    pad.rotation.y = Math.PI / 2;
    pad.position.set(side * 1.12, -0.42, 0);
    cup.add(pad);

    return cup;
  };

  group.add(cupFor(1), cupFor(-1));
  group.position.y = 0.15;
  return group;
}

export default function Scene3D({ progressRef, onReady, onFail }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      onFail();
      return;
    }

    let disposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 6.4);

    // Capping DPR at 2 stops high-density screens rendering 9x the pixels.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    mount.appendChild(renderer.domElement);

    // Warm studio lighting to match the blush palette.
    scene.add(new THREE.HemisphereLight(0xfff4ef, 0xe0bcb1, 1.5));
    const key = new THREE.DirectionalLight(0xfff1ea, 2.6);
    key.position.set(3, 4, 5);
    const rim = new THREE.DirectionalLight(0xd25b45, 1.9);
    rim.position.set(-4, 1.5, -3);
    const fill = new THREE.DirectionalLight(0xffffff, 0.9);
    fill.position.set(-2, -2, 4);
    scene.add(key, rim, fill);

    const model = buildHeadphones();
    scene.add(model);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let frameId = 0;
    let running = false;

    // Drag-to-rotate. Auto-spin resumes once the user lets go and the
    // momentum has bled off.
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velX = 0;
    let velY = 0;
    let userPitch = 0;

    const canvas = renderer.domElement;
    canvas.style.touchAction = 'none';
    canvas.style.cursor = 'grab';

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.style.cursor = 'grabbing';
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velX = (e.clientX - lastX) * 0.006;
      velY = (e.clientY - lastY) * 0.006;
      userPitch += velY;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = 'grab';
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    const tick = () => {
      const rect = progressRef.current?.getBoundingClientRect();
      const progress = rect
        ? 1 - (rect.top + rect.height) / (window.innerHeight + rect.height)
        : 0;

      if (!dragging) {
        // Coast, then hand back to the idle spin.
        userPitch += velY;
        velX *= 0.93;
        velY *= 0.93;
        model.rotation.y += 0.005;
      }

      // Keep the pitch within a range that never shows the model edge-on.
      userPitch = THREE.MathUtils.clamp(userPitch, -0.6, 0.6);

      model.rotation.y += velX;
      model.rotation.x = THREE.MathUtils.lerp(
        model.rotation.x,
        progress * 0.5 - 0.18 + userPitch,
        0.08
      );
      model.position.y = 0.15 + Math.sin(performance.now() / 1400) * 0.06;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || disposed) return;
      running = true;
      frameId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    // Never burn GPU while the canvas is off-screen.
    const visIo = new IntersectionObserver(
      (entries) => (entries.some((e) => e.isIntersecting) ? start() : stop()),
      { threshold: 0 }
    );
    visIo.observe(mount);

    onReady();

    return () => {
      disposed = true;
      stop();
      visIo.disconnect();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          const m = obj.material;
          if (Array.isArray(m)) {
            m.forEach((x) => x.dispose());
          } else {
            m?.dispose();
          }
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [progressRef, onReady, onFail]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
