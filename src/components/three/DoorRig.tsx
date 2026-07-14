"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { lerp } from "@/lib/utils";

export const DOOR_WIDTH = 1.05;
export const DOOR_HEIGHT = 2.5;
const DOOR_THICKNESS = 0.055;
const FRAME_DEPTH = 0.09;

type HandleMaterial = "matte-black" | "brushed-bronze" | "brushed-steel" | "chrome" | "concealed";

interface DoorRigProps {
  finishHex: string;
  handleMaterial: HandleMaterial;
  glass: boolean;
  targetOpenDeg: number;
  hovered: boolean;
  followCursor?: boolean;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
}

const HANDLE_MATERIALS: Record<HandleMaterial, { color: string; metalness: number; roughness: number }> = {
  "matte-black": { color: "#1c1d20", metalness: 0.6, roughness: 0.5 },
  "brushed-bronze": { color: "#a3793f", metalness: 0.85, roughness: 0.35 },
  "brushed-steel": { color: "#b9c0c6", metalness: 0.9, roughness: 0.3 },
  chrome: { color: "#e4e7ea", metalness: 1, roughness: 0.08 },
  concealed: { color: "#c7ccd1", metalness: 0.7, roughness: 0.4 },
};

export function DoorRig({
  finishHex,
  handleMaterial,
  glass,
  targetOpenDeg,
  hovered,
  followCursor = true,
  onPointerEnter,
  onPointerLeave,
  onClick,
}: DoorRigProps) {
  const houseGroup = useRef<THREE.Group>(null);
  const leafGroup = useRef<THREE.Group>(null);
  const currentAngle = useRef(0);

  const handleMat = HANDLE_MATERIALS[handleMaterial];

  const finishColor = useMemo(() => new THREE.Color(finishHex), [finishHex]);
  const isDark = useMemo(() => {
    const hsl = { h: 0, s: 0, l: 0 };
    finishColor.getHSL(hsl);
    return hsl.l < 0.35;
  }, [finishColor]);
  const panelColor = useMemo(() => finishColor.clone().offsetHSL(0, 0, isDark ? 0.03 : -0.035), [finishColor, isDark]);

  useFrame((state, delta) => {
    if (houseGroup.current && followCursor) {
      const targetRotY = state.pointer.x * 0.22;
      const targetRotX = -state.pointer.y * 0.08;
      houseGroup.current.rotation.y = lerp(houseGroup.current.rotation.y, targetRotY, 1 - Math.pow(0.001, delta));
      houseGroup.current.rotation.x = lerp(houseGroup.current.rotation.x, targetRotX, 1 - Math.pow(0.001, delta));
    }

    const hoverBoost = hovered ? 6 : 0;
    const desired = THREE.MathUtils.degToRad(-(targetOpenDeg + hoverBoost));
    currentAngle.current = lerp(currentAngle.current, desired, 1 - Math.pow(0.0015, delta));
    if (leafGroup.current) {
      leafGroup.current.rotation.y = currentAngle.current;
    }
  });

  const openProgress = useRef(0);
  useFrame(() => {
    openProgress.current = THREE.MathUtils.clamp(-currentAngle.current / (Math.PI / 2), 0, 1);
  });

  return (
    <group ref={houseGroup} position={[0, -DOOR_HEIGHT / 2, 0]}>
      {/* interior reveal plane, behind the doorway */}
      <group position={[DOOR_WIDTH / 2, DOOR_HEIGHT / 2, -0.24]}>
        <mesh receiveShadow>
          <planeGeometry args={[DOOR_WIDTH * 0.96, DOOR_HEIGHT * 0.98]} />
          <meshStandardMaterial color="#e7e2d6" roughness={0.9} metalness={0} />
        </mesh>
        <mesh position={[0, -DOOR_HEIGHT * 0.46, 0.12]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[DOOR_WIDTH * 0.96, 0.5]} />
          <meshStandardMaterial color="#cfc7b4" roughness={0.85} />
        </mesh>
      </group>

      {/* casing / frame */}
      <group>
        <RoundedBox args={[DOOR_WIDTH + 0.16, 0.09, FRAME_DEPTH]} radius={0.008} smoothness={4} position={[DOOR_WIDTH / 2, DOOR_HEIGHT + 0.02, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#fbfbfa" roughness={0.4} clearcoat={0.4} clearcoatRoughness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.09, DOOR_HEIGHT + 0.1, FRAME_DEPTH]} radius={0.008} smoothness={4} position={[-0.04, DOOR_HEIGHT / 2, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#fbfbfa" roughness={0.4} clearcoat={0.4} clearcoatRoughness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.09, DOOR_HEIGHT + 0.1, FRAME_DEPTH]} radius={0.008} smoothness={4} position={[DOOR_WIDTH + 0.04, DOOR_HEIGHT / 2, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial color="#fbfbfa" roughness={0.4} clearcoat={0.4} clearcoatRoughness={0.4} />
        </RoundedBox>
      </group>

      {/* leaf, pivoting around hinge at x=0 */}
      <group ref={leafGroup} position={[0, 0, 0]}>
        <group
          position={[DOOR_WIDTH / 2, DOOR_HEIGHT / 2, 0]}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onClick={onClick}
        >
          <RoundedBox args={[DOOR_WIDTH, DOOR_HEIGHT, DOOR_THICKNESS]} radius={0.01} smoothness={4} castShadow receiveShadow>
            <meshPhysicalMaterial
              color={finishColor}
              roughness={isDark ? 0.32 : 0.38}
              metalness={0.04}
              clearcoat={0.55}
              clearcoatRoughness={0.28}
              reflectivity={0.4}
            />
          </RoundedBox>

          {!glass ? (
            <RoundedBox
              args={[DOOR_WIDTH * 0.68, DOOR_HEIGHT * 0.82, 0.014]}
              radius={0.006}
              smoothness={4}
              position={[0, 0, DOOR_THICKNESS / 2 + 0.006]}
              castShadow
              receiveShadow
            >
              <meshPhysicalMaterial color={panelColor} roughness={0.42} metalness={0.03} clearcoat={0.3} />
            </RoundedBox>
          ) : (
            <mesh position={[0, 0, DOOR_THICKNESS / 2 + 0.008]}>
              <planeGeometry args={[DOOR_WIDTH * 0.62, DOOR_HEIGHT * 0.86]} />
              <meshPhysicalMaterial
                color="#eef1f3"
                roughness={0.15}
                metalness={0}
                transmission={0.82}
                thickness={0.4}
                ior={1.4}
                clearcoat={0.6}
              />
            </mesh>
          )}

          {/* handle */}
          <group position={[DOOR_WIDTH * 0.38, -0.02, DOOR_THICKNESS / 2 + 0.02]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.16, 20]} />
              <meshStandardMaterial {...handleMat} />
            </mesh>
            <mesh position={[0, 0, 0.015]} castShadow>
              <cylinderGeometry args={[0.028, 0.028, 0.012, 24]} />
              <meshStandardMaterial {...handleMat} />
            </mesh>
          </group>
        </group>
      </group>

      <ContactShadows position={[DOOR_WIDTH / 2, 0.001, 0.3]} opacity={0.55} scale={4} blur={2.4} far={2} resolution={512} color="#0e1013" />
    </group>
  );
}
