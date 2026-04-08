import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const BLENDER_GLB_URL = '/models/coffee_cup_blender.glb';

const SIZE_CONFIG = {
  small: { label: 'Small', cupScale: 0.9, fillScale: 0.84, cupHeight: 1.0, liquidColor: 0x5a3320 },
  medium: { label: 'Medium', cupScale: 1.0, fillScale: 1.0, cupHeight: 1.08, liquidColor: 0x6d4325 },
  large: { label: 'Large', cupScale: 1.12, fillScale: 1.18, cupHeight: 1.18, liquidColor: 0x7d4b2b },
};

function createCupMaterial(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.7,
    metalness: 0.08,
  });
}

function disposeObject3D(object) {
  object.traverse((child) => {
    if (!child.isMesh) {
      return;
    }

    child.geometry?.dispose();

    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose());
      return;
    }

    child.material?.dispose();
  });
}

function createProceduralCup(sizeConfig) {
  const root = new THREE.Group();

  const saucerGeometry = new THREE.CylinderGeometry(2.55, 2.85, 0.22, 48);
  const saucerMaterial = createCupMaterial(0xe9dfd0);
  const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
  saucer.position.y = -1.2;
  root.add(saucer);

  const saucerTop = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 2.5, 0.08, 48),
    new THREE.MeshStandardMaterial({ color: 0xf4efe6, roughness: 0.8, metalness: 0.04 }),
  );
  saucerTop.position.y = -1.05;
  root.add(saucerTop);

  const cupBody = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.75, 2.4, 48, 1, false),
    new THREE.MeshPhysicalMaterial({
      color: 0xfff8ef,
      roughness: 0.62,
      metalness: 0.02,
      clearcoat: 0.15,
      clearcoatRoughness: 0.2,
    }),
  );
  cupBody.position.y = 0.25;
  root.add(cupBody);

  const cupLip = new THREE.Mesh(
    new THREE.TorusGeometry(1.58, 0.12, 16, 48),
    new THREE.MeshStandardMaterial({ color: 0xe7ddd2, roughness: 0.6, metalness: 0.05 }),
  );
  cupLip.rotation.x = Math.PI / 2;
  cupLip.position.y = 1.38;
  root.add(cupLip);

  const coffee = new THREE.Mesh(
    new THREE.CylinderGeometry(1.28, 1.42, 1.0, 48),
    new THREE.MeshStandardMaterial({
      color: sizeConfig.liquidColor,
      roughness: 0.9,
      metalness: 0,
    }),
  );
  coffee.position.y = 0.92;
  root.add(coffee);

  const coffeeTop = new THREE.Mesh(
    new THREE.CylinderGeometry(1.18, 1.26, 0.06, 48),
    new THREE.MeshStandardMaterial({ color: 0xf3e2ca, roughness: 0.5, metalness: 0.03 }),
  );
  coffeeTop.position.y = 1.42;
  root.add(coffeeTop);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.18, 16, 40), createCupMaterial(0xe2d7cb));
  handle.position.set(1.85, 0.1, 0);
  handle.rotation.y = Math.PI / 2;
  root.add(handle);

  const steamMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.14,
    roughness: 1,
  });

  for (let index = 0; index < 3; index += 1) {
    const steam = new THREE.Mesh(new THREE.TorusGeometry(0.1 + index * 0.03, 0.03, 8, 32), steamMaterial);
    steam.position.set(-0.3 + index * 0.35, 2 + index * 0.12, 0);
    steam.rotation.x = Math.PI / 2;
    steam.rotation.z = index * 0.2;
    root.add(steam);
  }

  return { root, coffee, saucer };
}

export default function ThreeCupViewer({ size = 'medium', title = 'Coffee Cup', subtitle = 'Drag to rotate the cup' }) {
  const [modelVariant, setModelVariant] = useState('procedural');
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const cupGroupRef = useRef(null);
  const liquidRef = useRef(null);
  const saucerRef = useRef(null);
  const targetRotationRef = useRef({ x: 0.18, y: -0.35 });
  const currentRotationRef = useRef({ x: 0.18, y: -0.35 });
  const targetScaleRef = useRef(SIZE_CONFIG[size].cupScale);
  const currentScaleRef = useRef(SIZE_CONFIG[size].cupScale);
  const targetFillRef = useRef(SIZE_CONFIG[size].fillScale);
  const currentFillRef = useRef(SIZE_CONFIG[size].fillScale);
  const pointerStateRef = useRef({ dragging: false, x: 0, y: 0 });
  const sizeConfig = useMemo(() => SIZE_CONFIG[size] ?? SIZE_CONFIG.medium, [size]);

  useEffect(() => {
    targetScaleRef.current = sizeConfig.cupScale;
    targetFillRef.current = sizeConfig.fillScale;
  }, [sizeConfig]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 2.2, 8.2);
    camera.lookAt(0, 0.85, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.touchAction = 'none';
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff3e6, 2.2);
    keyLight.position.set(5, 7, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc89a62, 1.0);
    fillLight.position.set(-6, 3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.2, 30);
    rimLight.position.set(0, 6, 8);
    scene.add(rimLight);

    const floorGeometry = new THREE.CircleGeometry(4.8, 64);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x15110d,
      roughness: 1,
      metalness: 0,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.3;
    scene.add(floor);

    const grid = new THREE.GridHelper(9, 24, 0x5a6a8a, 0x2b3245);
    grid.position.y = -1.28;
    grid.material.transparent = true;
    grid.material.opacity = 0.45;
    scene.add(grid);

    const cupGroup = new THREE.Group();
    cupGroupRef.current = cupGroup;
    scene.add(cupGroup);

    const procedural = createProceduralCup(sizeConfig);
    cupGroup.add(procedural.root);
    liquidRef.current = procedural.coffee;
    saucerRef.current = procedural.saucer;
    setModelVariant('procedural');

    const loader = new GLTFLoader();
    loader.load(
      BLENDER_GLB_URL,
      (gltf) => {
        const blenderRoot = gltf.scene;
        if (!blenderRoot) {
          return;
        }

        const bounds = new THREE.Box3().setFromObject(blenderRoot);
        const sizeVec = new THREE.Vector3();
        const centerVec = new THREE.Vector3();
        bounds.getSize(sizeVec);
        bounds.getCenter(centerVec);

        const maxDimension = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
        const normalizedScale = 3.2 / maxDimension;
        blenderRoot.scale.setScalar(normalizedScale);

        const recenteredBounds = new THREE.Box3().setFromObject(blenderRoot);
        const recenteredCenter = new THREE.Vector3();
        recenteredBounds.getCenter(recenteredCenter);
        blenderRoot.position.set(-recenteredCenter.x, -recenteredCenter.y - 0.45, -recenteredCenter.z);

        blenderRoot.traverse((child) => {
          if (!child.isMesh) {
            return;
          }

          child.castShadow = true;
          child.receiveShadow = true;
          if (!child.material) {
            child.material = createCupMaterial(0xf0e2ce);
          }
        });

        cupGroup.remove(procedural.root);
        disposeObject3D(procedural.root);
        liquidRef.current = null;
        saucerRef.current = null;
        cupGroup.add(blenderRoot);
        setModelVariant('blender');
      },
      undefined,
      () => {
        setModelVariant('procedural');
      },
    );

    cupGroup.scale.setScalar(sizeConfig.cupScale);
    cupGroup.rotation.x = currentRotationRef.current.x;
    cupGroup.rotation.y = currentRotationRef.current.y;
    cupGroup.position.y = -0.2;

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    const onPointerDown = (event) => {
      pointerStateRef.current.dragging = true;
      pointerStateRef.current.x = event.clientX;
      pointerStateRef.current.y = event.clientY;
      container.setPointerCapture?.(event.pointerId);
    };

    const onPointerMove = (event) => {
      if (!cupGroupRef.current) {
        return;
      }

      if (pointerStateRef.current.dragging) {
        const deltaX = (event.clientX - pointerStateRef.current.x) * 0.008;
        const deltaY = (event.clientY - pointerStateRef.current.y) * 0.008;
        pointerStateRef.current.x = event.clientX;
        pointerStateRef.current.y = event.clientY;
        targetRotationRef.current.y += deltaX;
        targetRotationRef.current.x += deltaY;
        targetRotationRef.current.x = Math.max(-0.35, Math.min(0.55, targetRotationRef.current.x));
        return;
      }

      const rect = container.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotationRef.current.y = -0.34 + normalizedX * 0.55;
      targetRotationRef.current.x = 0.16 + normalizedY * 0.32;
    };

    const onPointerUp = (event) => {
      pointerStateRef.current.dragging = false;
      container.releasePointerCapture?.(event.pointerId);
    };

    const onPointerLeave = () => {
      pointerStateRef.current.dragging = false;
      targetRotationRef.current.x = 0.18;
      targetRotationRef.current.y = -0.35;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerLeave);

    const animate = () => {
      if (cupGroupRef.current) {
        currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
        currentFillRef.current += (targetFillRef.current - currentFillRef.current) * 0.08;
        currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
        currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

        cupGroupRef.current.scale.setScalar(currentScaleRef.current);
        cupGroupRef.current.rotation.x = currentRotationRef.current.x;
        cupGroupRef.current.rotation.y = currentRotationRef.current.y;

        if (liquidRef.current) {
          liquidRef.current.scale.y = currentFillRef.current;
          liquidRef.current.position.y = 0.52 + (currentFillRef.current - 1) * 0.35;
        }
      }

      if (saucerRef.current) {
        const hoverLift = 0.02 * Math.sin(performance.now() * 0.002);
        saucerRef.current.position.y = -1.2 + hoverLift;
      }

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      disposeObject3D(cupGroup);
      floor.geometry.dispose();
      floor.material.dispose();
      grid.geometry.dispose();
      grid.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [sizeConfig]);

  return (
    <div className="three-cup-viewer flex h-full w-full flex-col">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#8b7355]">3D Cup Viewer</p>
          <h4 className="mt-2 text-3xl font-bold uppercase tracking-tight text-[#2f2419]">{title}</h4>
        </div>
        <p className="max-w-56 text-right text-xs uppercase tracking-[0.28em] text-[#8b7355]">{subtitle}</p>
      </div>

      <div
        ref={containerRef}
        className="relative min-h-112 overflow-hidden rounded-[28px] border border-[#d2b48c]/35 bg-[#181411] shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
      >
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
          <span>Drag to rotate</span>
          <span>{modelVariant === 'blender' ? 'Blender Model' : 'Three.js Fallback'}</span>
        </div>
      </div>
    </div>
  );
}
