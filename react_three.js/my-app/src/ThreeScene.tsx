import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { CubeTextureLoader } from 'three';
import px from './textures/px.jpg'; // Replace with your own cubemap texture images
import nx from './textures/nx.jpg';
import py from './textures/py.jpg';
import ny from './textures/ny.jpg';
import pz from './textures/pz.jpg';
import nz from './textures/nz.jpg';

function ThreeScene() {
    const sceneRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef.current?.appendChild(renderer.domElement);
  
      // Load the cubemap texture
      const textureLoader = new CubeTextureLoader();
      const texture = textureLoader.load([px, nx, py, ny, pz, nz]);
      scene.background = texture;
  
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      camera.position.z = 5;
  
      function animate() {
        requestAnimationFrame(animate);
  
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        renderer.render(scene, camera);
      }
  
      animate();
  
      return () => {
        sceneRef.current?.removeChild(renderer.domElement);
      };
    }, []);
  
    return <div ref={sceneRef} />;
  }  

export default ThreeScene;