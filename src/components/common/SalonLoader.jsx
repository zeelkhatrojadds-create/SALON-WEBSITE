/**
 * GLAM GIRL BY JANKI — Ultra-Premium Cinematic 3D Salon Loading Experience
 * 
 * Cinematic 5-Second Brand Campaign Opening:
 * - 0.0–1.0s: Fade in from black, soft forest-green volumetric lighting, delicate floating dust particles,
 *             thin circular outline forms around reflective stage.
 * - 1.0–2.2s: 3D salon scissors emerge from depth; comb appears behind at complementary angle;
 *             both rotate with realistic perspective; scissors perform natural cutting movement.
 * - 2.2–3.5s: Controlled metallic glint sweeps along razor blades; sage light catches comb teeth;
 *             circular stage rotates slowly with ambient shadows and depth.
 * - 3.5–4.4s: Tools settle into balanced hero composition; GLAM GIRL BY JANKI appears with restrained typography;
 *             thin forest-green accent line draws beneath brand name; subtitle reveals.
 * - 4.4–5.0s: Smooth cinematic opacity fade-out; website seamlessly unveiled; all resources disposed.
 * 
 * Strict Palette: Deep Black (#10110F), Forest Green (#263D2B), Olive (#465640), Sage (#A8B5A0), Warm Cream (#F7F4ED).
 */

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const BRAND_NAME = 'GLAM GIRL BY JANKI';
const SUBTITLE = 'YOUR BEAUTY JOURNEY BEGINS HERE';
const DURATION_MS = 5000;

export default function SalonLoader({ onComplete }) {
  const canvasRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentSec, setCurrentSec] = useState(0);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // 1. Lock scrolling during initial loading presentation
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    // 2. Reduced motion check
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        handleComplete();
      }, 1800);
      return () => {
        clearTimeout(timer);
        restoreBodyScroll();
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // -------------------------------------------------------------------------
    // THREE.JS SCENE SETUP
    // -------------------------------------------------------------------------
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (err) {
      console.warn('WebGL initialization failed, using luxury 2D fallback:', err);
      setWebGlSupported(false);
      const fallbackTimer = setTimeout(() => handleComplete(), DURATION_MS);
      return () => {
        clearTimeout(fallbackTimer);
        restoreBodyScroll();
      };
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 8.8);

    // -------------------------------------------------------------------------
    // MATERIALS (STRICT PURE WHITE POLISHED METALLIC & CERAMIC FINISH)
    // -------------------------------------------------------------------------
    // Pure White Polished Metallic Salon Steel for Scissor Blades & Shanks
    const whiteSteelMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.94,
      roughness: 0.12,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95
    });

    // Razor-Sharp Cutting Edge Highlight (Pure Silver-White Reflection)
    const razorEdgeMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.98,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    // Pure White Polished Tension Screw Dial & Countersunk Washer
    const screwCapMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.96,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    // White Rubber Scissor Stopper Bumper (Neutral Soft White, NO green/black)
    const bumperMat = new THREE.MeshStandardMaterial({
      color: 0xEEEEEE,
      metalness: 0.05,
      roughness: 0.55
    });

    // Pure White Ceramic Salon Comb (Smooth, Satin-Reflective, NO colored tint)
    const combWhiteMat = new THREE.MeshPhysicalMaterial({
      color: 0xFFFFFF,
      metalness: 0.08,
      roughness: 0.20,
      clearcoat: 0.70,
      clearcoatRoughness: 0.12
    });

    // Comb Spine Accent Engraving Line (Soft Silver-White)
    const combStripeMat = new THREE.MeshPhysicalMaterial({
      color: 0xF2F5F3,
      metalness: 0.65,
      roughness: 0.15
    });

    // Reflective circular stage disc
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x121714,
      metalness: 0.85,
      roughness: 0.25
    });

    // Stage outer thin glowing rim
    const stageRimMat = new THREE.MeshBasicMaterial({
      color: 0x263D2B,
      transparent: true,
      opacity: 0.7
    });

    const sageRingMat = new THREE.MeshBasicMaterial({
      color: 0xA8B5A0,
      transparent: true,
      opacity: 0.5
    });

    // -------------------------------------------------------------------------
    // 1. REFLECTIVE CIRCULAR STAGE DISC & OUTLINE
    // -------------------------------------------------------------------------
    const stageGroup = new THREE.Group();
    stageGroup.position.set(0, -1.55, 0);
    stageGroup.rotation.x = Math.PI / 10;
    scene.add(stageGroup);

    // Circular Stage Base Disc
    const stageDiscGeom = new THREE.CylinderGeometry(2.35, 2.35, 0.06, 64);
    const stageDisc = new THREE.Mesh(stageDiscGeom, stageMat);
    stageGroup.add(stageDisc);

    // Glowing Forest-Green Perimeter Ring
    const rimGeom = new THREE.TorusGeometry(2.36, 0.015, 16, 80);
    const stageRim = new THREE.Mesh(rimGeom, stageRimMat);
    stageRim.rotation.x = Math.PI / 2;
    stageGroup.add(stageRim);

    // Outer Thin Sage Orbital Ring
    const outerRingGeom = new THREE.TorusGeometry(2.65, 0.008, 16, 90);
    const outerRing = new THREE.Mesh(outerRingGeom, sageRingMat);
    outerRing.rotation.x = Math.PI / 2;
    stageGroup.add(outerRing);

    // -------------------------------------------------------------------------
    // 2. ANATOMICALLY ACCURATE PROFESSIONAL SALON SCISSORS MODEL
    // -------------------------------------------------------------------------
    // Class 1 Lever: Blade 1 (Left blade + Right finger ring & pinky tang)
    //                Blade 2 (Right blade + Left offset thumb ring)
    // Joined at fulcrum pivot screw at (0, 0, 0).
    const scissorsGroup = new THREE.Group();
    scene.add(scissorsGroup);

    // --- Piece 1: Still Blade (Finger Blade with Sculpted Tang) ---
    const blade1Shape = new THREE.Shape();
    blade1Shape.moveTo(0.0, 2.32); // Blade tip
    blade1Shape.quadraticCurveTo(-0.14, 1.70, -0.16, 1.10); // Outer convex spine (Hamaguri curve)
    blade1Shape.quadraticCurveTo(-0.16, 0.45, -0.14, 0.08); // Down to pivot boss
    blade1Shape.lineTo(-0.12, -0.08); // Across pivot left perimeter
    // Crosses fulcrum into shank going to stylist's finger ring (right side):
    blade1Shape.quadraticCurveTo(-0.02, -0.35, 0.08, -0.65); // Ergonomic shank crossing fulcrum
    blade1Shape.quadraticCurveTo(0.16, -0.95, 0.20, -1.10); // Blends into finger ring top-left
    // Finger Ring Outer Contour (Ring center: 0.36, -1.38)
    blade1Shape.quadraticCurveTo(0.16, -1.58, 0.26, -1.70); // Bottom-left of ring
    blade1Shape.quadraticCurveTo(0.36, -1.74, 0.48, -1.68); // Bottom of ring
    // Sculpted Finger Rest / Tang (Pinky Rest curving gracefully outward):
    blade1Shape.quadraticCurveTo(0.60, -1.62, 0.72, -1.70);
    blade1Shape.quadraticCurveTo(0.85, -1.78, 0.90, -1.74); // Tip of tang
    blade1Shape.quadraticCurveTo(0.88, -1.62, 0.76, -1.50); // Upper return curve of tang
    blade1Shape.quadraticCurveTo(0.64, -1.35, 0.62, -1.22); // Blends into outer-right of finger ring
    blade1Shape.quadraticCurveTo(0.56, -1.02, 0.44, -0.80); // Upper-right of ring
    blade1Shape.quadraticCurveTo(0.30, -0.50, 0.18, -0.20); // Outer shank returning to pivot
    blade1Shape.lineTo(0.14, 0.08); // Right side of pivot boss
    blade1Shape.lineTo(0.0, 0.08); // Inner cutting edge root
    blade1Shape.lineTo(0.0, 2.32); // Straight razor cutting edge up to tip
    blade1Shape.closePath();

    // Finger ring hole
    const fingerHole = new THREE.Path();
    fingerHole.absellipse(0.36, -1.38, 0.15, 0.19, 0, Math.PI * 2, true);
    blade1Shape.holes.push(fingerHole);

    // Central pivot screw clearance hole
    const pivotHole1 = new THREE.Path();
    pivotHole1.absellipse(0, 0, 0.045, 0.045, 0, Math.PI * 2, true);
    blade1Shape.holes.push(pivotHole1);

    const blade1Geom = new THREE.ExtrudeGeometry(blade1Shape, {
      steps: 1,
      depth: 0.034,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.012,
      bevelSegments: 3
    });
    // Align depth so inner cutting surface sits at z = +0.002
    blade1Geom.translate(0, 0, 0.002);

    const blade1 = new THREE.Mesh(blade1Geom, whiteSteelMat);

    // Razor-edge specular line along cutting edge
    const edge1Shape = new THREE.Shape();
    edge1Shape.moveTo(0.0, 0.10);
    edge1Shape.lineTo(-0.018, 0.10);
    edge1Shape.lineTo(-0.018, 2.30);
    edge1Shape.lineTo(0.0, 2.30);
    edge1Shape.closePath();
    const edge1Geom = new THREE.ExtrudeGeometry(edge1Shape, { steps: 1, depth: 0.038, bevelEnabled: false });
    edge1Geom.translate(0, 0, 0.001);
    const edge1Mesh = new THREE.Mesh(edge1Geom, razorEdgeMat);
    blade1.add(edge1Mesh);

    // Soft White Rubber Stopper Bumper between handles
    const bumperGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.048, 12);
    const bumperMesh = new THREE.Mesh(bumperGeom, bumperMat);
    bumperMesh.position.set(0.18, -1.18, 0.018);
    bumperMesh.rotation.z = Math.PI / 2.5;
    blade1.add(bumperMesh);

    // --- Piece 2: Moving Blade (Thumb Blade with Crane Offset) ---
    const blade2Shape = new THREE.Shape();
    blade2Shape.moveTo(0.0, 2.32); // Blade tip
    blade2Shape.lineTo(0.0, 0.08); // Straight razor cutting edge down to root
    blade2Shape.lineTo(-0.14, 0.08); // Left side of pivot boss
    blade2Shape.lineTo(-0.18, -0.20); // Outer shank going down-left towards thumb ring
    blade2Shape.quadraticCurveTo(-0.30, -0.50, -0.44, -0.80);
    blade2Shape.quadraticCurveTo(-0.56, -1.02, -0.60, -1.22); // Outer-left of thumb ring (Center: -0.34, -1.32)
    blade2Shape.quadraticCurveTo(-0.60, -1.55, -0.48, -1.66); // Bottom-left of thumb ring
    blade2Shape.quadraticCurveTo(-0.34, -1.70, -0.24, -1.62); // Bottom of thumb ring
    blade2Shape.quadraticCurveTo(-0.14, -1.50, -0.16, -1.28); // Inner-right of thumb ring
    blade2Shape.quadraticCurveTo(-0.14, -1.05, -0.06, -0.65); // Inner shank crossing fulcrum
    blade2Shape.quadraticCurveTo(0.02, -0.35, 0.12, -0.08); // Right side of pivot boss
    blade2Shape.lineTo(0.14, 0.08); // Right side of pivot boss
    blade2Shape.quadraticCurveTo(0.16, 0.45, 0.16, 1.10); // Outer convex spine (Hamaguri curve)
    blade2Shape.quadraticCurveTo(0.14, 1.70, 0.0, 2.32); // Up to tip
    blade2Shape.closePath();

    // Thumb ring hole
    const thumbHole = new THREE.Path();
    thumbHole.absellipse(-0.34, -1.32, 0.14, 0.18, 0, Math.PI * 2, true);
    blade2Shape.holes.push(thumbHole);

    // Central pivot screw clearance hole
    const pivotHole2 = new THREE.Path();
    pivotHole2.absellipse(0, 0, 0.045, 0.045, 0, Math.PI * 2, true);
    blade2Shape.holes.push(pivotHole2);

    const blade2Geom = new THREE.ExtrudeGeometry(blade2Shape, {
      steps: 1,
      depth: 0.034,
      bevelEnabled: true,
      bevelThickness: 0.014,
      bevelSize: 0.012,
      bevelSegments: 3
    });
    // Align depth so inner cutting surface sits at z = -0.002
    blade2Geom.translate(0, 0, -0.036);

    const blade2 = new THREE.Mesh(blade2Geom, whiteSteelMat);

    // Razor-edge specular line along cutting edge
    const edge2Shape = new THREE.Shape();
    edge2Shape.moveTo(0.0, 0.10);
    edge2Shape.lineTo(0.018, 0.10);
    edge2Shape.lineTo(0.018, 2.30);
    edge2Shape.lineTo(0.0, 2.30);
    edge2Shape.closePath();
    const edge2Geom = new THREE.ExtrudeGeometry(edge2Shape, { steps: 1, depth: 0.038, bevelEnabled: false });
    edge2Geom.translate(0, 0, -0.037);
    const edge2Mesh = new THREE.Mesh(edge2Geom, razorEdgeMat);
    blade2.add(edge2Mesh);

    scissorsGroup.add(blade1);
    scissorsGroup.add(blade2);

    // --- Central Fulcrum Pivot Screw Assembly (Fixed at 0, 0, 0) ---
    const pivotGroup = new THREE.Group();
    // Front tension screw washer
    const washerGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.018, 32);
    const washerMesh = new THREE.Mesh(washerGeom, screwCapMat);
    washerMesh.rotation.x = Math.PI / 2;
    washerMesh.position.z = 0.044;
    pivotGroup.add(washerMesh);

    // Raised knurled tension screw head
    const screwHeadGeom = new THREE.CylinderGeometry(0.092, 0.092, 0.026, 32);
    const screwHead = new THREE.Mesh(screwHeadGeom, screwCapMat);
    screwHead.rotation.x = Math.PI / 2;
    screwHead.position.z = 0.058;
    pivotGroup.add(screwHead);

    // Tension screw adjustment slot / coin-turn detail
    const slotGeom = new THREE.BoxGeometry(0.13, 0.018, 0.016);
    const slotMat = new THREE.MeshBasicMaterial({ color: 0xD8DBD9 });
    const slotMesh = new THREE.Mesh(slotGeom, slotMat);
    slotMesh.position.z = 0.071;
    pivotGroup.add(slotMesh);

    // Central tension screw gem / dome
    const screwGemGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 24);
    const screwGem = new THREE.Mesh(screwGemGeom, screwCapMat);
    screwGem.rotation.x = Math.PI / 2;
    screwGem.position.z = 0.068;
    pivotGroup.add(screwGem);

    // Back retaining nut
    const nutGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.02, 32);
    const nutMesh = new THREE.Mesh(nutGeom, screwCapMat);
    nutMesh.rotation.x = Math.PI / 2;
    nutMesh.position.z = -0.044;
    pivotGroup.add(nutMesh);

    // Central axle pin
    const pinGeom = new THREE.CylinderGeometry(0.042, 0.042, 0.11, 24);
    const pinMesh = new THREE.Mesh(pinGeom, screwCapMat);
    pinMesh.rotation.x = Math.PI / 2;
    pivotGroup.add(pinMesh);

    scissorsGroup.add(pivotGroup);

    // Initial scissors placement
    scissorsGroup.position.set(-0.25, 0.15, 0.15);

    // -------------------------------------------------------------------------
    // 3. ANATOMICALLY ACCURATE PROFESSIONAL SALON COMB MODEL
    // -------------------------------------------------------------------------
    // Straight rigid spine + 44 flat precision beveled teeth aligned in one rigid object
    const combGroup = new THREE.Group();
    scene.add(combGroup);

    // Comb Spine Geometry (Length 3.3, Height 0.28, Depth 0.046)
    const spineShape = new THREE.Shape();
    const spineHalfLen = 1.65;
    const spineH = 0.28;
    const spineR = 0.06;

    spineShape.moveTo(-spineHalfLen + spineR, 0);
    spineShape.lineTo(spineHalfLen - spineR, 0);
    spineShape.quadraticCurveTo(spineHalfLen, 0, spineHalfLen, spineR);
    spineShape.lineTo(spineHalfLen, spineH - spineR);
    spineShape.quadraticCurveTo(spineHalfLen, spineH, spineHalfLen - spineR, spineH);
    // Subtle ergonomic grip recess in center top of spine
    spineShape.lineTo(0.35, spineH);
    spineShape.quadraticCurveTo(0, spineH - 0.03, -0.35, spineH);
    spineShape.lineTo(-spineHalfLen + spineR, spineH);
    spineShape.quadraticCurveTo(-spineHalfLen, spineH, -spineHalfLen, spineH - spineR);
    spineShape.lineTo(-spineHalfLen, spineR);
    spineShape.quadraticCurveTo(-spineHalfLen, 0, -spineHalfLen + spineR, 0);
    spineShape.closePath();

    const spineGeom = new THREE.ExtrudeGeometry(spineShape, {
      steps: 1,
      depth: 0.046,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.008,
      bevelSegments: 2
    });
    spineGeom.center();
    // Place root edge of spine at y = 0
    spineGeom.translate(0, spineH / 2, 0);

    const spineMesh = new THREE.Mesh(spineGeom, combWhiteMat);
    combGroup.add(spineMesh);

    // Comb Precision Measurement Groove / Silver Accent Stripe along spine
    const stripeGeom = new THREE.BoxGeometry(3.1, 0.012, 0.052);
    const stripeMesh = new THREE.Mesh(stripeGeom, combStripeMat);
    stripeMesh.position.set(0, spineH * 0.72, 0);
    combGroup.add(stripeMesh);

    // Flat Tapered Salon Comb Tooth (Beveled rectangular prism, tapered tip)
    const toothShape = new THREE.Shape();
    const tw = 0.013; // Half-width (0.026 total width)
    toothShape.moveTo(-tw, 0);
    toothShape.lineTo(tw, 0);
    toothShape.lineTo(tw * 0.75, -0.72);
    toothShape.quadraticCurveTo(tw * 0.5, -0.82, 0, -0.82); // Smooth tapered glinting tip
    toothShape.quadraticCurveTo(-tw * 0.5, -0.82, -tw * 0.75, -0.72);
    toothShape.closePath();

    const toothGeom = new THREE.ExtrudeGeometry(toothShape, {
      steps: 1,
      depth: 0.036,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.003,
      bevelSegments: 2
    });
    toothGeom.center();
    // Align tooth root exactly with bottom of spine at y = 0
    toothGeom.translate(0, -0.41, 0);

    // 44 Individually Modelled Comb Teeth (Wide section + Fine section)
    const totalTeeth = 44;
    const teethInstanced = new THREE.InstancedMesh(toothGeom, combWhiteMat, totalTeeth);
    const toothDummy = new THREE.Object3D();

    let tIdx = 0;
    // Section 1: Wide Teeth (Stylist Sectioning Section, left half)
    for (let x = -1.48; x <= -0.16; x += 0.088) {
      if (tIdx >= totalTeeth) break;
      toothDummy.position.set(x, 0, 0);
      // Tooth 0 is slightly shorter (Iconic salon parting tooth for sectioning)
      if (tIdx === 0) {
        toothDummy.scale.set(1.0, 0.78, 1.0);
      } else {
        toothDummy.scale.set(1.0, 1.0, 1.0);
      }
      toothDummy.updateMatrix();
      teethInstanced.setMatrixAt(tIdx++, toothDummy.matrix);
    }
    // Section 2: Fine Teeth (Stylist Precision Cutting Section, right half)
    for (let x = -0.04; x <= 1.48; x += 0.054) {
      if (tIdx >= totalTeeth) break;
      toothDummy.position.set(x, 0, 0);
      toothDummy.scale.set(0.92, 0.98, 0.92);
      toothDummy.updateMatrix();
      teethInstanced.setMatrixAt(tIdx++, toothDummy.matrix);
    }
    teethInstanced.instanceMatrix.needsUpdate = true;
    combGroup.add(teethInstanced);

    // Comb initial placement (Floating beside and slightly behind scissors)
    combGroup.position.set(0.48, -0.05, -0.45);
    combGroup.rotation.set(-0.2, 0.25, -0.32);

    // -------------------------------------------------------------------------
    // 4. FLOATING DUST PARTICLES (ATMOSPHERIC DEPTH)
    // -------------------------------------------------------------------------
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8.0;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6.0;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6.0;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xA8B5A0,
      size: 0.035,
      transparent: true,
      opacity: 0.55
    });
    const dustParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(dustParticles);

    // -------------------------------------------------------------------------
    // 5. NEUTRAL STUDIO LIGHTING RIG FOR STRICT PURE WHITE TOOLS
    // -------------------------------------------------------------------------
    // Soft Ambient Light (guarantees neutral light-grey shadows without pitch black or colored tint)
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.55);
    scene.add(ambientLight);

    // Key Light - Neutral Pure White Directional Light from top-right-front
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.8);
    keyLight.position.set(3.5, 4.5, 5.0);
    scene.add(keyLight);

    // Fill Light - Soft Neutral Light from bottom-left-front
    const fillLight = new THREE.DirectionalLight(0xF4F6F9, 0.85);
    fillLight.position.set(-3.2, -1.2, 3.5);
    scene.add(fillLight);

    // Rim Back Light - Crisp white contour rim separating tools from deep black background
    const backRimLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    backRimLight.position.set(0.2, 3.8, -4.5);
    scene.add(backRimLight);

    // Grazing Edge Light - Highlights comb teeth slits and scissor blade hollow
    const grazingLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);
    grazingLight.position.set(4.5, 0.5, -1.5);
    scene.add(grazingLight);

    // Controlled Metallic Glint Sweep Light (sweeps during 2.2s–3.6s)
    const glintLight = new THREE.PointLight(0xFFFFFF, 0, 8);
    glintLight.position.set(-2.5, 0.5, 1.8);
    scene.add(glintLight);

    // -------------------------------------------------------------------------
    // 6. CHOREOGRAPHED 5-SECOND TIMELINE LOOP
    // -------------------------------------------------------------------------
    let animFrame;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const seconds = elapsed / 1000;
      setCurrentSec(seconds);

      // 0.0–1.0s: Atmosphere Fade-In & Initial Stage Rotation
      const stageRotSpeed = 0.003;
      stageGroup.rotation.y += stageRotSpeed;

      // Stage glow opacity transitions smoothly in phase 1
      if (seconds < 1.0) {
        stageRimMat.opacity = Math.min(0.7, seconds * 0.7);
        sageRingMat.opacity = Math.min(0.5, seconds * 0.5);
      } else {
        stageRimMat.opacity = 0.7;
        sageRingMat.opacity = 0.5;
      }

      // 1.0–2.2s: The Signature Tools Depth Reveal
      // Scissors and comb smoothly emerge from depth Z (-2.5 -> +0.15)
      if (seconds < 1.0) {
        scissorsGroup.position.z = -2.5;
        scissorsGroup.scale.setScalar(0.01);
        combGroup.position.z = -3.0;
        combGroup.scale.setScalar(0.01);
      } else if (seconds >= 1.0 && seconds < 2.2) {
        const t = (seconds - 1.0) / 1.2;
        // Cubic ease-out
        const ease = 1 - Math.pow(1 - t, 3);

        scissorsGroup.position.z = -2.5 + ease * 2.65;
        scissorsGroup.scale.setScalar(ease);

        combGroup.position.z = -3.0 + ease * 2.55;
        combGroup.scale.setScalar(ease);
      } else {
        scissorsGroup.position.z = 0.15;
        scissorsGroup.scale.setScalar(1.0);
        combGroup.position.z = -0.45;
        combGroup.scale.setScalar(1.0);
      }

      // Continuous 3D Perspective Rotation & Snipping of Scissors
      if (seconds >= 1.0) {
        // Natural, refined scissor opening & closing around fulcrum (0, 0, 0)
        // Oscillates smoothly between nearly closed (0.025 rad) and open (0.22 rad)
        const snipCycle = Math.sin((seconds - 1.0) * 2.2);
        const snipAngle = 0.025 + Math.pow(Math.max(0, snipCycle), 1.5) * 0.19;

        // Class 1 lever: Blade 1 opens to left (+Z rotation), Blade 2 opens to right (-Z rotation)
        // Simultaneously, their handles open apart naturally!
        blade1.rotation.z = snipAngle;
        blade2.rotation.z = -snipAngle;

        // Controlled 3D perspective tumbling rotation of complete scissors assembly
        scissorsGroup.rotation.y = Math.sin(seconds * 0.45) * 0.24;
        scissorsGroup.rotation.x = 0.10 + Math.cos(seconds * 0.38) * 0.12;
        scissorsGroup.rotation.z = -0.16 + Math.sin(seconds * 0.32) * 0.06;

        // Comb gentle independent floating & complementary rotation (Rigid body)
        combGroup.position.y = -0.05 + Math.sin(seconds * 0.5) * 0.035;
        combGroup.rotation.y = -0.22 + Math.sin(seconds * 0.4) * 0.18;
        combGroup.rotation.x = -0.12 + Math.cos(seconds * 0.45) * 0.10;
        combGroup.rotation.z = -0.30 + Math.sin(seconds * 0.35) * 0.05;
      }

      // 2.2–3.6s: Controlled Metallic Glint Sweep across white shears and comb teeth
      if (seconds >= 2.2 && seconds < 3.8) {
        const glintProgress = (seconds - 2.2) / 1.6;
        glintLight.intensity = Math.sin(glintProgress * Math.PI) * 2.8;
        glintLight.position.x = -2.5 + glintProgress * 5.0;
        glintLight.position.y = 0.2 + Math.sin(glintProgress * Math.PI) * 1.2;
      } else {
        glintLight.intensity = 0;
      }

      // 3.5–4.4s: Settle into Hero Composition
      if (seconds >= 3.5) {
        const settleT = Math.min(1, (seconds - 3.5) / 0.9);
        const settleEase = 1 - Math.pow(1 - settleT, 2);
        // Settle smoothly towards balanced hero pose
        scissorsGroup.position.x = THREE.MathUtils.lerp(scissorsGroup.position.x, -0.22, settleEase * 0.05);
        scissorsGroup.position.y = THREE.MathUtils.lerp(scissorsGroup.position.y, 0.12, settleEase * 0.05);
        combGroup.position.x = THREE.MathUtils.lerp(combGroup.position.x, 0.45, settleEase * 0.05);
        combGroup.position.y = THREE.MathUtils.lerp(combGroup.position.y, -0.06, settleEase * 0.05);
      }

      // Atmospheric Dust Particles Drift
      dustParticles.rotation.y += 0.0008;
      dustParticles.rotation.x += 0.0004;

      // Subtle Camera Dolly Glide
      const totalProgress = Math.min(1, seconds / 5.0);
      camera.position.z = 8.8 - totalProgress * 1.4;

      renderer.render(scene, camera);

      if (elapsed < DURATION_MS) {
        animFrame = requestAnimationFrame(animate);
      } else {
        handleComplete();
      }
    };

    animFrame = requestAnimationFrame(animate);

    // 7. Safety Fallback Timer (5.5s)
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, DURATION_MS + 500);

    // 8. Window Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. ESC Key to Skip
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 10. Memory Cleanup
    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);

      whiteSteelMat.dispose();
      razorEdgeMat.dispose();
      screwCapMat.dispose();
      bumperMat.dispose();
      combWhiteMat.dispose();
      combStripeMat.dispose();
      slotMat.dispose();
      stageMat.dispose();
      stageRimMat.dispose();
      sageRingMat.dispose();

      blade1Geom.dispose();
      edge1Geom.dispose();
      bumperGeom.dispose();
      blade2Geom.dispose();
      edge2Geom.dispose();
      washerGeom.dispose();
      screwHeadGeom.dispose();
      slotGeom.dispose();
      screwGemGeom.dispose();
      nutGeom.dispose();
      pinGeom.dispose();
      spineGeom.dispose();
      stripeGeom.dispose();
      toothGeom.dispose();

      stageDiscGeom.dispose();
      rimGeom.dispose();
      outerRingGeom.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();

      restoreBodyScroll();
    };
  }, []);

  const restoreBodyScroll = () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  };

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      restoreBodyScroll();
      if (onComplete) onComplete();
    }, 450);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Loading GLAM GIRL BY JANKI"
      aria-live="polite"
      className={`fixed inset-0 z-[999999] bg-[#10110F] text-[#F7F4ED] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        /* Forest-green volumetric ambient backdrop lighting */
        @keyframes volumetricLightBloom {
          0% { opacity: 0; transform: scale(0.65); }
          50% { opacity: 0.55; transform: scale(0.9); }
          100% { opacity: 0.85; transform: scale(1.0); }
        }

        /* 3.5–4.4s: Forest-Green Accent Line Draw */
        @keyframes drawAccentLine {
          0% { width: 0%; opacity: 0; }
          40% { opacity: 1; }
          100% { width: 140px; opacity: 1; }
        }

        /* Brand Title Calm Reveal */
        @keyframes brandTitleCalmReveal {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Subtitle Fade In */
        @keyframes subtitleCalmReveal {
          0% { opacity: 0; transform: translateY(5px); letter-spacing: 0.28em; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0.36em; }
        }
      `}</style>

      {/* ------------------------------------------------------------- */}
      {/* 0.0–1.0s: ATMOSPHERE BACKDROP & VOLUMETRIC FOREST LIGHT       */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(38,61,43,0.7) 0%, rgba(70,86,64,0.28) 45%, rgba(16,17,15,0) 75%)',
          animation: 'volumetricLightBloom 2.4s ease-out forwards',
          filter: 'blur(40px)'
        }}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[at_center] from-transparent via-[#10110F]/25 to-[#10110F]/95" />

      {/* Header with Monogram & Skip Option */}
      <div className="w-full max-w-5xl flex items-center justify-between relative z-20 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#263D2B] border border-[#A8B5A0]/35 flex items-center justify-center text-[#F7F4ED] shadow-xs">
            <span className="font-serif text-[11px] font-bold text-[#A8B5A0]">G</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A8B5A0]">
            GLAM GIRL BY JANKI
          </span>
        </div>

        <button
          type="button"
          onClick={handleComplete}
          className="px-3 py-1 rounded-full border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 text-[10px] uppercase tracking-wider text-[#A8B5A0] hover:text-white transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Skip campaign intro"
        >
          Skip (ESC)
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* THREE.JS REAL 3D CANVAS STAGE                                */}
      {/* ------------------------------------------------------------- */}
      {webGlSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      ) : (
        /* Static 2D Fallback for Non-WebGL devices */
        <div className="my-auto flex flex-col items-center justify-center relative z-10">
          <div className="w-32 h-32 rounded-full border border-[#263D2B] flex items-center justify-center bg-[#263D2B]/10 backdrop-blur-xs shadow-2xl">
            <span className="font-serif text-3xl text-[#A8B5A0]">GGJ</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3.5–4.4s: BRAND REVEAL & ACCENT LINE                          */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="relative z-20 text-center space-y-2.5 mt-auto mb-6 pointer-events-none transition-all duration-700 ease-out flex flex-col items-center"
        style={{
          opacity: currentSec >= 3.4 ? 1 : 0,
          transform: currentSec >= 3.4 ? 'translateY(0)' : 'translateY(10px)'
        }}
      >
        {/* Brand Name */}
        <h1 
          className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F7F4ED] font-normal tracking-[0.26em] uppercase drop-shadow-lg"
          style={{
            animation: currentSec >= 3.4 ? 'brandTitleCalmReveal 0.8s ease-out forwards' : 'none'
          }}
        >
          {BRAND_NAME}
        </h1>

        {/* Thin Forest-Green Accent Line that draws smoothly beneath brand name */}
        <div 
          className="h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#263D2B] to-transparent shadow-[0_0_8px_rgba(38,61,43,0.8)]"
          style={{
            width: currentSec >= 3.6 ? '140px' : '0px',
            opacity: currentSec >= 3.6 ? 1 : 0,
            transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
          }}
        />

        {/* Subtitle */}
        <p
          className="font-sans text-[10px] sm:text-[11px] font-semibold text-[#A8B5A0] tracking-[0.36em] uppercase drop-shadow-xs pt-0.5"
          style={{
            animation: currentSec >= 3.6 ? 'subtitleCalmReveal 0.8s ease-out forwards' : 'none'
          }}
        >
          {SUBTITLE}
        </p>
      </div>

      {/* Subtle Hairline Progress Indicator */}
      <div className="w-full max-w-xs relative z-20 pb-4 pointer-events-none flex flex-col items-center gap-1.5">
        <div className="w-full flex justify-between text-[11px] font-mono font-medium text-[#A8B5A0] tracking-wider px-0.5">
          <span className="uppercase text-[9px] tracking-[0.2em] text-[#A8B5A0]/60 font-sans">
            Campaign Reveal
          </span>
          <span>{Math.min(100, Math.floor((currentSec / 5.0) * 100))}%</span>
        </div>
        <div 
          className="w-full h-[2px] rounded-full bg-white/10 overflow-hidden relative"
          role="progressbar"
          aria-valuenow={Math.min(100, Math.floor((currentSec / 5.0) * 100))}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Campaign 3D Loading Progress"
        >
          <div
            className="h-full bg-gradient-to-r from-[#263D2B] via-[#465640] to-[#A8B5A0] rounded-full transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(168,181,160,0.8)]"
            style={{ width: `${Math.min(100, (currentSec / 5.0) * 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
