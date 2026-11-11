import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playHeartbeatSound } from '../utils/soundEffects';

export const ThreeHeartCanvas = ({ onHeartClick }) => {
  const mountRef = useRef(null);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 320;
    const height = currentMount.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // Heart Shape
    const heartShape = new THREE.Shape();
    // Parametric heart formula scaled nicely
    heartShape.moveTo(0, 2);
    heartShape.bezierCurveTo(0, 3.5, -2, 5, -4, 5);
    heartShape.bezierCurveTo(-7, 5, -7, 2, -7, 2);
    heartShape.bezierCurveTo(-7, -1, -5, -4, 0, -8);
    heartShape.bezierCurveTo(5, -4, 7, -1, 7, 2);
    heartShape.bezierCurveTo(7, 2, 7, 5, 4, 5);
    heartShape.bezierCurveTo(2, 5, 0, 3.5, 0, 2);

    const extrudeSettings = {
      depth: 2.2,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Material with deep red sheen
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xDC2626,
      emissive: 0x5a0909,
      roughness: 0.15,
      metalness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const heartMesh = new THREE.Mesh(geometry, material);
    heartMesh.scale.set(0.85, 0.85, 0.85);
    scene.add(heartMesh);

    // Particle Cloud around Heart
    const particlesCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 32;
      positions[i + 1] = (Math.random() - 0.5) * 32;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: 0xFCA5A5,
      size: 0.25,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLightRed = new THREE.PointLight(0xDC2626, 8, 50);
    pointLightRed.position.set(10, 10, 15);
    scene.add(pointLightRed);

    const pointLightWhite = new THREE.PointLight(0xffebee, 4, 40);
    pointLightWhite.position.set(-10, -10, 15);
    scene.add(pointLightWhite);

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
      targetRotationY = mouseX * 0.75;
      targetRotationX = -mouseY * 0.75;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotate towards target mouse angle
      heartMesh.rotation.y += (targetRotationY - heartMesh.rotation.y) * 0.08;
      heartMesh.rotation.x += (targetRotationX - heartMesh.rotation.x) * 0.08;
      heartMesh.rotation.z = Math.sin(elapsedTime * 1.5) * 0.05;

      // Natural heartbeat breathing pulse
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.04;
      heartMesh.scale.set(0.85 * pulse, 0.85 * pulse, 0.85 * pulse);

      // Rotate particle cloud slowly
      particleSystem.rotation.y = elapsedTime * 0.12;
      particleSystem.rotation.x = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleClick = () => {
    setIsBouncing(true);
    playHeartbeatSound();
    if (onHeartClick) onHeartClick();
    setTimeout(() => setIsBouncing(false), 500);
  };

  return (
    <div
      ref={mountRef}
      onClick={handleClick}
      title="Click to pulse Sneha's 3D Heart ❤️"
      className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto cursor-pointer transition-transform duration-300 ${
        isBouncing ? 'scale-110' : 'hover:scale-105'
      }`}
    >
      <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-[#DC2626]/20 via-transparent to-[#FEE2E2]/10 blur-2xl pointer-events-none" />
    </div>
  );
};

