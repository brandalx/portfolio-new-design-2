//@ts-nocheck
"use client";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import Loader from "./Loader";
import MusicControls from "./MusicControls";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { IconCamera } from "@tabler/icons-react";

RectAreaLightUniformsLib.init();

function Model({
  onPlaneClick,
  hoveredMesh,
  setHoveredMesh,
}: {
  onPlaneClick: (planeName: string, mesh: THREE.Mesh) => void;
  hoveredMesh: THREE.Mesh | null;
  setHoveredMesh: (mesh: THREE.Mesh | null) => void;
}) {
  const { scene, animations } = useGLTF("/models/desk.glb");
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());
  const interactiveMeshes = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const action = actions["ChairRotation"];
    if (action) {
      action.play();
      action.setLoop(THREE.LoopRepeat, Infinity);
    }
  }, [actions]);

  useEffect(() => {
    interactiveMeshes.current = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Log mesh name and texture
        const textureName = child.material?.map?.name || "No texture";
        console.log(`Mesh: ${child.name}, Texture: ${textureName}`);

        // Mark interactive meshes
        if (["SCREEN1", "SCREEN2", "SCREEN3"].includes(child.name)) {
          child.userData.isInteractive = true;
          interactiveMeshes.current.push(child);

          console.log("INTERACTIVE CHILD", interactiveMeshes.current);

          // Ensure material supports emissive properties
          if (!(child.material instanceof THREE.MeshStandardMaterial)) {
            child.material = new THREE.MeshStandardMaterial({
              map: child.material.map || null,
              color: child.material.color || 0xffffff,
              emissive: new THREE.Color(0x000000),
              emissiveIntensity: 0,
            });
          }
        }
      }
    });
  }, [scene]);

  // Handle pointer move for hover effects
  const { camera, gl } = useThree();

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleClick = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(pointer.current, camera);
      const intersects = raycaster.current.intersectObjects(
        interactiveMeshes.current,
        false
      );

      if (
        intersects.length > 0 &&
        intersects[0].object.userData.isInteractive
      ) {
        console.log(`Clicked on: ${intersects[0].object.name}`); // Debug log
        onPlaneClick(
          intersects[0].object.name,
          intersects[0].object as THREE.Mesh
        );
      }
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("click", handleClick);

    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl, camera, onPlaneClick]);

  useFrame(() => {
    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObjects(
      interactiveMeshes.current,
      false
    );

    const target = intersects.length > 0 ? intersects[0].object : null;

    if (target !== hoveredMesh) {
      if (
        hoveredMesh &&
        hoveredMesh.material instanceof THREE.MeshStandardMaterial
      ) {
        gsap.to(hoveredMesh.material, {
          emissiveIntensity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(hoveredMesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        });
      }

      if (target && target.material instanceof THREE.MeshStandardMaterial) {
        target.material.emissive = new THREE.Color(0xffd700); // Orange/gold glow
        gsap.to(target.material, {
          emissiveIntensity: 0.3,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(target.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }

      setHoveredMesh(target);
    }
  });

  return <primitive object={scene} ref={groupRef} />;
}

function AreaLights() {
  return (
    <>
      <spotLight
        intensity={20}
        color="#FF00DD"
        position={[1.378, 1.286, 1.379]}
        angle={1.497}
        penumbra={0.15}
        decay={2}
      />
      <spotLight
        intensity={10.0}
        color="#ffffff"
        position={[0.0, 0.0, -0.0]}
        angle={0.393}
        penumbra={0.15}
        decay={2}
      />
      <pointLight
        intensity={15.0}
        color="#FF6E00"
        position={[-1.157, 1.33, -1.842]}
        decay={2}
      />
      <pointLight
        intensity={5}
        color="#FF6A00"
        position={[-1.778, 0.572, 1.484]}
        decay={4}
      />
    </>
  );
}

function Modal({
  isOpen,
  onClose,
  iframeSrc,
}: {
  isOpen: boolean;
  onClose: () => void;
  iframeSrc: string;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (overlayRef.current && modalRef.current) {
        overlayRef.current.classList.remove("hidden");
        modalRef.current.classList.remove("hidden");

        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(modalRef.current, { opacity: 0, scale: 0.9 });

        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(modalRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => {
            if (modalRef.current) {
              gsap.set(modalRef.current, { clearProps: "opacity,scale" });
            }
          },
        });
      }
    } else {
      if (overlayRef.current && modalRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(modalRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.4,
          ease: "back.in(1.7)",
          onComplete: () => {
            if (overlayRef.current && modalRef.current) {
              overlayRef.current.classList.add("hidden");
              modalRef.current.classList.add("hidden");
              gsap.set(modalRef.current, { clearProps: "opacity,scale" });
            }
          },
        });
      }
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        className={`overlay fixed inset-0 w-full bg-black/50 z-40 ${isOpen ? "" : "hidden"}`}
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        className={`fixed inset-0 z-50 w-full flex items-center justify-center mx-auto ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="w-[95%] h-[90vh] rounded-xl bg-[#5a5d7e] overflow-hidden text-white backdrop-blur-md shadow-2xl">
          <div className="w-full h-full bg-[#0f1121]/50 rounded-xl border border-gray-800 relative">
            {iframeSrc && (
              <iframe
                src={iframeSrc}
                title="Interactive Content"
                className="w-full h-full rounded-xl"
              ></iframe>
            )}

            {/* Modal controls */}
            <div className="absolute top-3 right-3 flex gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
              <div
                className="h-4 w-4 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"
                onClick={onClose}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Scene({
  onPlaneClick,
  initialCameraPos,
  initialTarget,
  hoveredMesh,
  setHoveredMesh,
  orbitControlsRef,
  isZooming,
}: {
  onPlaneClick: (planeName: string, mesh: THREE.Mesh) => void;
  initialCameraPos: React.MutableRefObject<THREE.Vector3>;
  initialTarget: React.MutableRefObject<THREE.Vector3>;
  hoveredMesh: THREE.Mesh | null;
  setHoveredMesh: (mesh: THREE.Mesh | null) => void;
  orbitControlsRef: React.MutableRefObject<any>;
  isZooming: boolean;
}) {
  const { camera } = useThree();
  const orbitRef = useRef<any>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const lastInteractionTimeRef = useRef(Date.now());

  useEffect(() => {
    const controls = orbitRef.current;
    if (!controls) return;

    // Set the ref for parent component to access
    orbitControlsRef.current = controls;

    controls.addEventListener("start", () => {
      lastInteractionTimeRef.current = Date.now();
      setAutoRotate(false);
    });

    controls.addEventListener("change", () => {
      lastInteractionTimeRef.current = Date.now();
      setAutoRotate(false);
    });

    initialCameraPos.current.copy(camera.position);
    initialTarget.current.copy(controls.target);

    // Apply custom OrbitControls settings conditionally based on zoom state
    if (isZooming) {
      // During zoom animation, remove distance limits
      controls.minDistance = 0;
      controls.maxDistance = Infinity;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI;
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;
      controls.enabled = false; // Disable user interaction during zoom
    } else {
      // Normal state with limits
      controls.minDistance = 0.5;
      controls.maxDistance = 6;
      controls.minPolarAngle = THREE.MathUtils.degToRad(10);
      controls.maxPolarAngle = THREE.MathUtils.degToRad(80);
      controls.minAzimuthAngle = -THREE.MathUtils.degToRad(25);
      controls.maxAzimuthAngle = THREE.MathUtils.degToRad(90);
      controls.enabled = true; // Enable user interaction
    }

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    return () => {
      controls.removeEventListener("start", () => {});
      controls.removeEventListener("change", () => {});
    };
  }, [camera, initialCameraPos, initialTarget, orbitControlsRef, isZooming]);

  return (
    <>
      <OrbitControls ref={orbitRef} enablePan={false} />
      <AreaLights />
      <ambientLight intensity={0.2} />
      <Model
        onPlaneClick={onPlaneClick}
        hoveredMesh={hoveredMesh}
        setHoveredMesh={setHoveredMesh}
      />
      <Preload all />
    </>
  );
}

export default function ModelViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const orbitRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialCameraPos = useRef(new THREE.Vector3(10, 6, 10));
  const initialTarget = useRef(new THREE.Vector3(0, 0, 0));
  const [isZooming, setIsZooming] = useState(false);
  const [hoveredMesh, setHoveredMesh] = useState<THREE.Mesh | null>(null);

  const planeIframeMap: { [key: string]: string } = {
    SCREEN1: "https://bbcmicro.brandnolandev.com?disc1=bs-badappl.dsd&autoboot",
    SCREEN2: "https://retro-os.brandnolandev.com",

    SCREEN3: "https://office.brandnolandev.com",
  };

  const captureCanvas = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const targetWidth = 1920;
    const targetHeight = 1080;
    const targetAspect = targetWidth / targetHeight;
    const canvasAspect = canvas.width / canvas.height;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = targetWidth;
    tempCanvas.height = targetHeight;
    const context = tempCanvas.getContext("2d");

    if (context) {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, targetWidth, targetHeight);

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > targetAspect) {
        drawWidth = targetWidth;
        drawHeight = targetWidth / canvasAspect;
        offsetX = 0;
        offsetY = (targetHeight - drawHeight) / 2;
      } else {
        drawHeight = targetHeight;
        drawWidth = targetHeight * canvasAspect;
        offsetX = (targetWidth - drawWidth) / 2;
        offsetY = 0;
      }

      context.drawImage(canvas, offsetX, offsetY, drawWidth, drawHeight);

      const dataURL = tempCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-screenshot.png";
      link.click();
    }
  };

  const handlePlaneClick = (planeName: string, mesh: THREE.Mesh) => {
    if (!cameraRef.current || !orbitRef.current) {
      console.log("Camera or OrbitControls ref not available");
      return;
    }

    console.log(`Clicked mesh: ${planeName}`); // Debug log

    // Set zooming state to disable OrbitControls limits
    setIsZooming(true);

    // Get the world position of the mesh
    const worldPosition = new THREE.Vector3();
    mesh.getWorldPosition(worldPosition);

    // Get the mesh's bounding box to understand its dimensions
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    // Calculate camera position very close to the mesh - much closer now!
    const cameraDistance = Math.max(size.x, size.y, size.z) * 0.3 + 0.2; // Very close distance

    // Position camera directly in front of the mesh's center
    const cameraOffset = new THREE.Vector3(0, 0, cameraDistance);
    const newCameraPos = center.clone().add(cameraOffset);
    const newTarget = center.clone();

    console.log("Mesh center:", center);
    console.log("Camera position:", newCameraPos);
    console.log("Camera distance:", cameraDistance);

    // Animate camera zoom
    gsap.to(cameraRef.current.position, {
      x: newCameraPos.x,
      y: newCameraPos.y,
      z: newCameraPos.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => orbitRef.current?.update(),
      onComplete: () => {
        setIframeSrc(
          planeIframeMap[planeName] || "https://os-snake-game.vercel.app/"
        );
        setIsModalOpen(true);
        // Keep zooming state true while modal is open
      },
    });

    gsap.to(orbitRef.current.target, {
      x: newTarget.x,
      y: newTarget.y,
      z: newTarget.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => orbitRef.current?.update(),
    });
  };

  const closeModal = () => {
    if (!cameraRef.current || !orbitRef.current) return;

    setIsModalOpen(false);

    gsap.to(cameraRef.current.position, {
      x: initialCameraPos.current.x,
      y: initialCameraPos.current.y,
      z: initialCameraPos.current.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => orbitRef.current?.update(),
      onComplete: () => {
        // Re-enable normal OrbitControls limits after zoom out
        setIsZooming(false);
      },
    });

    gsap.to(orbitRef.current.target, {
      x: initialTarget.current.x,
      y: initialTarget.current.y,
      z: initialTarget.current.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => orbitRef.current?.update(),
    });
  };

  return (
    <div className="w-full h-screen relative fixed inset-0 bg-black flex items-center justify-center z-50">
      <Canvas
        camera={{ position: [10, 6, 10], fov: 60 }}
        ref={canvasRef}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ camera }) => {
          cameraRef.current = camera as THREE.PerspectiveCamera;
        }}
      >
        <Suspense fallback={<Loader />}>
          <Scene
            onPlaneClick={handlePlaneClick}
            initialCameraPos={initialCameraPos}
            initialTarget={initialTarget}
            hoveredMesh={hoveredMesh}
            setHoveredMesh={setHoveredMesh}
            orbitControlsRef={orbitRef}
            isZooming={isZooming}
          />
        </Suspense>
      </Canvas>

      <MusicControls />
      <Modal isOpen={isModalOpen} onClose={closeModal} iframeSrc={iframeSrc} />

      <button
        onClick={captureCanvas}
        className="absolute top-21 right-4 bg-black/60 rounded-xl p-3 hover:bg-black/70 transition-all flex items-center gap-2 text-sm backdrop-blur-xl cursor-pointer"
      >
        <IconCamera className="h-4 w-4" />
        Capture Image
      </button>
    </div>
  );
}
