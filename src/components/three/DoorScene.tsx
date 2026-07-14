"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom, N8AO, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { DoorRig } from "./DoorRig";

interface DoorSceneProps {
  finishHex: string;
  handleMaterial: "matte-black" | "brushed-bronze" | "brushed-steel" | "chrome" | "concealed";
  glass: boolean;
  targetOpenDeg: number;
  hovered: boolean;
  followCursor?: boolean;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
  className?: string;
}

export function DoorScene({ className, ...rigProps }: DoorSceneProps) {
  return (
    <Canvas
      className={className}
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <PerspectiveCamera makeDefault position={[0.9, 0.35, 3.1]} fov={32} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[2.4, 3.2, 2]}
        intensity={2.2}
        color="#fff6ea"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0003}
      >
        <orthographicCamera attach="shadow-camera" args={[-1.6, 1.6, 1.6, -1.6, 0.1, 8]} />
      </directionalLight>
      <directionalLight position={[-2.2, 1.4, -1.6]} intensity={0.55} color="#cfe0ff" />
      <pointLight position={[0.6, 1.2, -0.4]} intensity={0.4} color="#ffd9ad" distance={3} />

      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={0.65}>
          <Lightformer form="rect" intensity={2.2} color="#fff9ef" position={[2, 3, 2]} scale={[3, 3, 1]} target={[0, 1, 0]} />
          <Lightformer form="rect" intensity={1.1} color="#dfe8ff" position={[-3, 1.5, -1]} scale={[3, 4, 1]} target={[0, 1, 0]} />
          <Lightformer form="ring" intensity={0.6} color="#ffffff" position={[0, 1.2, 3.5]} scale={2} target={[0, 1, 0]} />
          <Lightformer form="rect" intensity={0.5} color="#ffffff" position={[0, -1, 1]} scale={[4, 2, 1]} rotation={[Math.PI / 2, 0, 0]} />
        </Environment>
        <DoorRig {...rigProps} />
      </Suspense>

      <EffectComposer enableNormalPass multisampling={0}>
        <N8AO aoRadius={0.4} intensity={1.1} distanceFalloff={1} />
        <Bloom mipmapBlur luminanceThreshold={0.86} intensity={0.4} radius={0.6} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}
