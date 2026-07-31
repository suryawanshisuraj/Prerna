import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Heart } from 'lucide-react';

export default function ThreeHeart() {
  const mountRef = useRef(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, animationFrameId, geometry, material;

    try {
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Heart Shape construction
      const x = 0, y = 0;
      const heartShape = new THREE.Shape();
      heartShape.moveTo(x + 5, y + 5);
      heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
      heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
      heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
      heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
      heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
      heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

      geometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 2,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1,
      });

      material = new THREE.MeshPhongMaterial({
        color: 0xd81b60,
        shininess: 100,
        specular: 0xffb2bf,
      });

      const heart = new THREE.Mesh(geometry, material);
      heart.scale.set(0.1, 0.1, 0.1);
      heart.rotation.x = Math.PI; // Flip upright
      scene.add(heart);

      // Lighting
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(5, 5, 10);
      scene.add(dirLight);

      const ambientLight = new THREE.AmbientLight(0xffe9e7, 0.8);
      scene.add(ambientLight);

      camera.position.z = 4.5;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        heart.rotation.y += 0.012;
        heart.position.y = Math.sin(Date.now() * 0.002) * 0.15;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 300;
        const h = container.clientHeight || 300;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to CSS heart animation:", err);
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError) {
    return (
      <div className="w-full h-64 md:h-80 flex items-center justify-center">
        <div className="relative flex items-center justify-center animate-bounce">
          <div className="absolute w-36 h-36 bg-[#fd6c9c]/30 rounded-full blur-xl animate-pulse" />
          <Heart className="w-32 h-32 text-[#d81b60] fill-current drop-shadow-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div ref={mountRef} className="w-full h-64 md:h-80 flex items-center justify-center cursor-grab active:cursor-grabbing" />
  );
}
