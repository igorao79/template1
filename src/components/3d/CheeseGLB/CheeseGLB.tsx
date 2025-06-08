"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import styles from './CheeseGLB.module.scss';

export function CheeseGLB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const modelLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Предотвращаем повторную отправку события
    if (modelLoadedRef.current) return;

    // Создаем сцену
    const scene = new THREE.Scene();

    // Создаем камеру с видом сверху-сбоку
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 3); // Позиция камеры сверху-сбоку
    camera.lookAt(0, 0, 0);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance" // Важно для плавности
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Фиксим дёргания на ретине
    renderer.setClearColor(0x000000, 0); // Прозрачный фон
    containerRef.current.appendChild(renderer.domElement);

    // Добавляем освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xE8871E, 0.8);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Добавляем временный placeholder в виде сыра
    const tempGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 32);
    const tempMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5CB5C,
      roughness: 0.7,
      metalness: 0.1
    });
    const tempMesh = new THREE.Mesh(tempGeometry, tempMaterial);
    tempMesh.position.set(0, -0.5, 0);
    tempMesh.rotation.set(0.3, 0.5, 0.1);
    scene.add(tempMesh);

    // Переменные для левитации
    let time = 0;
    let model: THREE.Object3D = tempMesh;

    // Загружаем модель сыра
    const loader = new GLTFLoader();
    loader.load(
      './images/cheesemodel.glb',
      (gltf) => {
        scene.remove(tempMesh); // Удаляем временную модель
        
        const loadedModel = gltf.scene;
        // Настраиваем модель - уменьшаем размер
        loadedModel.scale.set(1.0, 1.0, 1.0);
        loadedModel.position.set(0, -0.5, 0);
        loadedModel.rotation.set(0.3, 0.5, 0.1); // Поворот для лучшего вида сверху-сбоку
        
        scene.add(loadedModel);
        model = loadedModel;
        
        // Плавно показываем модель после загрузки
        setIsReady(true);
        
        // Отправляем событие о загрузке модели с небольшой задержкой
        // чтобы убедиться, что модель отрендерилась
        setTimeout(() => {
          if (!modelLoadedRef.current) {
            modelLoadedRef.current = true;
            window.dispatchEvent(new Event('model-loaded'));
            console.log('Model loaded event dispatched');
          }
        }, 1000);
      },
      (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error('Ошибка при загрузке модели:', error);
        // Отправляем событие о загрузке модели даже при ошибке
        if (!modelLoadedRef.current) {
          modelLoadedRef.current = true;
          window.dispatchEvent(new Event('model-loaded'));
          console.log('Model loaded event dispatched (error)');
        }
      }
    );

    // Обработчик изменения размера окна
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Анимация
    const animate = () => {
      time += 0.01;
      
      if (model) {
        // Плавная левитация вверх-вниз
        model.position.y = -0.5 + Math.sin(time) * 0.1;
        
        // Очень медленное вращение
        model.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Очистка
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement.parentNode) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.warn('Error removing renderer:', e);
        }
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={styles.container}
      style={{ 
        width: '100%', 
        height: '100%',
        opacity: isReady ? 1 : 0.3, // Начинаем с полупрозрачного состояния
        transition: 'opacity 0.6s ease-out' // Плавный переход
      }}
    />
  );
}

export default CheeseGLB; 