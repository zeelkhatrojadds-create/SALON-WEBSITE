// GLAM GIRL BY JANKI — 5-Second Real WebGL 3D Animation Loading Screen
// Powered by Three.js with rotating 3D faceted crystal jewel, dual orbital rings, and swirling galaxy particles.
// Clean, luxury presentation with zero awkward bottom debug text.

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Leaf } from 'lucide-react';

export default function LuxuryLoader({ onComplete }) {
  const canvasRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progressPercent, setProgressPercent] = useState(0);

  const DURATION_MS = 5000; // Exact 5.0 seconds

  useEffect(() => {
    // Lock scroll during opening animation
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // -------------------------------------------------------------------------
    // THREE.JS SCENE SETUP
    // -------------------------------------------------------------------------
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // -------------------------------------------------------------------------
    // 3D OBJECTS: CRYSTAL JEWEL, ORBITAL RINGS & PARTICLE GALAXY
    // -------------------------------------------------------------------------
    
    // 1. Faceted Emerald Crystal Jewel
    const jewelGroup = new THREE.Group();
    scene.add(jewelGroup);

    // Outer faceted diamond icosahedron
    const jewelGeom = new THREE.IcosahedronGeometry(1.45, 0);
    const jewelMat = new THREE.MeshPhysicalMaterial({
      color: 0x263D2B,
      roughness: 0.15,
      metalness: 0.75,
      transmission: 0.35,
      ior: 1.55,
      transparent: true,
      opacity: 0.95,
      flatShading: true
    });
    const jewelMesh = new THREE.Mesh(jewelGeom, jewelMat);
    jewelGroup.add(jewelMesh);

    // Sage wireframe cage highlighting the facets
    const wireframeGeom = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.46, 0));
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xA8B5A0,
      transparent: true,
      opacity: 0.55
    });
    const wireframeLines = new THREE.LineSegments(wireframeGeom, wireframeMat);
    jewelGroup.add(wireframeLines);

    // 2. Dual 3D Gyroscopic Orbital Rings
    const ring1Geom = new THREE.TorusGeometry(2.35, 0.022, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xA8B5A0,
      roughness: 0.3,
      metalness: 0.85
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    scene.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(2.8, 0.018, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x465640,
      roughness: 0.4,
      metalness: 0.7
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    scene.add(ring2);

    // 3. 3D Swirling Stardust Particle Galaxy
    const particleCount = 380;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xA8B5A0,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);

    // -------------------------------------------------------------------------
    // LIGHTS
    // -------------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLightSage = new THREE.PointLight(0xA8B5A0, 3.5, 25);
    pointLightSage.position.set(4, 5, 4);
    scene.add(pointLightSage);

    const pointLightForest = new THREE.PointLight(0x263D2B, 4.5, 25);
    pointLightForest.position.set(-4, -4, 3);
    scene.add(pointLightForest);

    // -------------------------------------------------------------------------
    // ANIMATION & TIMER LOOP (3000ms)
    // -------------------------------------------------------------------------
    let animationFrameId;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / DURATION_MS);
      setProgressPercent(Math.floor(progress * 100));

      // 3D Rotations
      jewelGroup.rotation.x += 0.012;
      jewelGroup.rotation.y += 0.018;

      ring1.rotation.z += 0.015;
      ring1.rotation.y += 0.008;

      ring2.rotation.x += 0.01;
      ring2.rotation.z -= 0.012;

      particlePoints.rotation.y += 0.003;
      particlePoints.rotation.z += 0.001;

      // Cinematic dolly zoom (8.5 to 6.2)
      camera.position.z = 8.5 - progress * 2.3;

      renderer.render(scene, camera);

      if (elapsed < DURATION_MS) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Complete -> trigger silky smooth reveal
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
          if (onComplete) onComplete();
        }, 450);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Handle Window Resize
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Escape Key to Skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          if (typeof document !== 'undefined') {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
          }
          if (onComplete) onComplete();
        }, 200);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup Three.js on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);

      jewelGeom.dispose();
      jewelMat.dispose();
      wireframeGeom.dispose();
      wireframeMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
      }
      if (onComplete) onComplete();
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Loading GLAM GIRL BY JANKI"
      aria-live="polite"
      className={`fixed inset-0 z-[999999] bg-[#10110F] text-[#F7F4ED] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Real Full-Screen WebGL 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[at_center] from-transparent via-[#10110F]/30 to-[#10110F]/90" />

      {/* Minimal Header with Brand Monogram & Skip */}
      <div className="w-full max-w-5xl flex items-center justify-between relative z-10 pt-2">
        <div className="flex items-center gap-2">
          <Leaf className="w-3.5 h-3.5 text-[#A8B5A0]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#A8B5A0]">
            GLAM GIRL BY JANKI
          </span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="px-3 py-1 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-[10px] uppercase tracking-wider text-[#A8B5A0] hover:text-white transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Skip 3D loading"
        >
          Skip (ESC)
        </button>
      </div>

      {/* Elegant Brand Signature Center Display */}
      <div className="relative z-10 text-center space-y-2 mt-auto mb-10 pointer-events-none">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F7F4ED] font-normal tracking-wide drop-shadow-lg">
          GLAM GIRL BY JANKI
        </h1>
        <p className="font-serif text-xs sm:text-sm text-[#A8B5A0] italic font-light tracking-widest drop-shadow-md">
          Haute Coiffure • Organic Henna • Aesthetic Wellness
        </p>
      </div>

      {/* Ultra-Clean Hairline Progress Line (NO Awkward Text Strings) */}
      <div className="w-full max-w-xs relative z-10 pb-6 pointer-events-none">
        <div 
          className="w-full h-[2px] rounded-full bg-white/10 overflow-hidden relative"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Opening 3D Loading Progress"
        >
          <div
            className="h-full bg-gradient-to-r from-[#263D2B] via-[#465640] to-[#A8B5A0] rounded-full transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(168,181,160,0.8)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

    </aside>
  );
}
