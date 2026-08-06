import { useEffect, useRef } from 'react';

export default function HeroThreeCanvas(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!containerRef.current) return;
    // Desktop-only guard
    if (window.innerWidth < 900) return;

    let mounted = true;
    let cleanupFn: () => void = () => {};

    (async () => {
      const THREE = await import('three');
      const {
        WebGLRenderer,
        Scene,
        PerspectiveCamera,
        Color,
        AmbientLight,
        DirectionalLight,
        Mesh,
        MeshStandardMaterial,
        TorusKnotGeometry,
        Clock,
        PMREMGenerator,
        sRGBEncoding,
      } = THREE as any;

      // Postprocessing imports from examples (lazy)
      const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { GLTFLoader }] = await Promise.all([
        import('three/examples/jsm/postprocessing/EffectComposer'),
        import('three/examples/jsm/postprocessing/RenderPass'),
        import('three/examples/jsm/postprocessing/UnrealBloomPass'),
        import('three/examples/jsm/loaders/GLTFLoader'),
      ]);

      const container = containerRef.current as HTMLDivElement;
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 400;

      const renderer = new WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputEncoding = sRGBEncoding;
      renderer.toneMapping = (THREE as any).ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);

      const scene = new Scene();
      scene.background = new Color(0x070708);

      const camera = new PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 6);

      const ambient = new AmbientLight(0xffffff, 0.45);
      scene.add(ambient);

      const key = new DirectionalLight(0xffd700, 1.4);
      key.position.set(6, 8, 6);
      scene.add(key);

      // Try loading a GLB model from /models/hero.glb for higher fidelity
      let mesh: any = null;
      try {
        const loader = new (GLTFLoader as any)();
        const gltf = await new Promise((resolve, reject) => {
          loader.load(
            '/models/hero.glb',
            (g: any) => resolve(g),
            undefined,
            (err: any) => reject(err)
          );
        });
        mesh = (gltf as any).scene;
        mesh.traverse((n: any) => {
          if (n.isMesh) {
            n.castShadow = true;
            n.receiveShadow = true;
            if (n.material) {
              n.material.metalness = 1;
              n.material.roughness = 0.18;
            }
          }
        });
        mesh.scale.setScalar(1.1);
        scene.add(mesh);
      } catch (err) {
        const geometry = new TorusKnotGeometry(1.05, 0.33, 256, 32);
        const material = new MeshStandardMaterial({
          color: 0xD4AF37,
          metalness: 1,
          roughness: 0.18,
          emissive: 0x220e00,
          emissiveIntensity: 0.02,
        });
        mesh = new Mesh(geometry, material);
        scene.add(mesh);
      }

      function onResize() {
        const w = container.clientWidth || 600;
        const h = container.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        composer.setSize(w, h);
      }

      window.addEventListener('resize', onResize);

      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      function onPointerMove(e: PointerEvent) {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        targetX = (x - 0.5) * Math.PI * 0.12;
        targetY = (y - 0.5) * Math.PI * 0.12;
      }

      container.addEventListener('pointermove', onPointerMove);

      // Setup postprocessing composer with bloom
      const renderPass = new (RenderPass as any)(scene, camera);
      const bloomPass = new (UnrealBloomPass as any)(
        undefined,
        0.9, // strength
        0.6, // radius
        0.1 // threshold
      );

      const composer = new (EffectComposer as any)(renderer);
      composer.addPass(renderPass);
      composer.addPass(bloomPass);

      const clock = new Clock();
      let rafId = 0;

      const animate = () => {
        const dt = clock.getDelta();
        currentX += (targetX - currentX) * 0.06;
        currentY += (targetY - currentY) * 0.06;

        if (mesh) {
          mesh.rotation.y += 0.4 * dt;
          mesh.rotation.x = currentY;
          mesh.rotation.z = currentX;
        }

        composer.render(dt);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      cleanupFn = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        container.removeEventListener('pointermove', onPointerMove);
        try {
          renderer.dispose();
        } catch {}
        try {
          geometry.dispose();
          (material as any).dispose();
        } catch {}
        try {
          container.removeChild(renderer.domElement);
        } catch {}
      };

      if (!mounted) cleanupFn();
    })();

    return () => {
      mounted = false;
      try {
        cleanupFn();
      } catch {}
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden' }}
      aria-hidden
    />
  );
}
