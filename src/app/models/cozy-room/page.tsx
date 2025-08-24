"use client";

import { useGLTF } from "@react-three/drei";
import ModelViewer from "@/components/models/ModelViewer";

import NavBarModels from "@/components/floatingModels";

useGLTF.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);

// Remove the preload to let Suspense handle loading
// useGLTF.preload("/models/desk.glb");

export default function Page() {
  return (
    <div className="max-h-screen overflow-hidden">
      <NavBarModels />
      <ModelViewer />
    </div>
  );
}
