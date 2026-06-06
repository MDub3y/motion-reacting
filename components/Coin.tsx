"use client";

import React from "react";
import { motion, useTime, useTransform } from "motion/react";

// --- Constants ---
const COIN_RADIUS = 100;
const COIN_THICKNESS = 20; // The depth of the coin
const ROTATION_SPEED = 3500; // ms per full rotation

// --- Types ---
// interface Point {
//   x: number;
//   y: number;
// }

interface ProjectedDisk {
  cx: number; // Center X projected
  rx: number; // Radius X (width) projected
  zIndex: number; // For sorting faces
  isFront: boolean; // Tracking identity
}

// --- Helper Functions ---

/**
 * Projects a 3D point rotated around Y axis onto 2D plane
 */
const projectPoint = (
  x: number,
  z: number,
  angle: number,
): { x: number; z: number } => {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // Rotate around Y axis
  const rotX = x * cos + z * sin;
  const rotZ = z * cos - x * sin;

  return { x: rotX, z: rotZ };
};

/**
 * Generates the SVG path for the "side" (thickness) of the coin.
 * Connects the tangents of the front and back ellipses.
 */
const calculateSidePath = (
  front: ProjectedDisk,
  back: ProjectedDisk,
): string => {
  // We connect the top and bottom tangents of both ellipses
  // Top-left, Top-right, Bottom-right, Bottom-left
  return `
    M ${front.cx} ${-COIN_RADIUS}
    L ${back.cx} ${-COIN_RADIUS}
    L ${back.cx} ${COIN_RADIUS}
    L ${front.cx} ${COIN_RADIUS}
    Z
  `;
};

// --- Sub-Components for Cleanliness ---

const CoinFaceDefinition = () => (
  <defs>
    {/* The dark blue face gradient */}
    <linearGradient id="faceGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#1e1b4b" /> {/* Indigo 950 */}
      <stop offset="50%" stopColor="#0f172a" /> {/* Slate 900 */}
      <stop offset="100%" stopColor="#020617" /> {/* Slate 950 */}
    </linearGradient>

    {/* The holographic rainbow rim gradient */}
    <linearGradient id="rimGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#00ffff" /> {/* Cyan */}
      <stop offset="25%" stopColor="#3b82f6" /> {/* Blue */}
      <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
      <stop offset="75%" stopColor="#f43f5e" /> {/* Pink/Red */}
      <stop offset="100%" stopColor="#eab308" /> {/* Yellow */}
    </linearGradient>

    {/* The glow filter for the sparkle */}
    <filter id="glow">
      <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

const Sparkle = ({
  x,
  y,
  opacity,
}: {
  x: number;
  y: number;
  opacity: number;
}) => {
  // A simple 4-point star shape
  const size = 15;
  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      style={{ opacity }}
      filter="url(#glow)"
    >
      <path
        d={`M0 -${size} Q0 0 ${size} 0 Q0 0 0 ${size} Q0 0 -${size} 0 Q0 0 0 -${size}`}
        fill="white"
      />
    </motion.g>
  );
};

// --- Main Component ---

export const RobinhoodCoin3D: React.FC = () => {
  const time = useTime();

  // Transform time into a continuous rotation angle (0 -> 360)
  const rotateY = useTransform(time, [0, ROTATION_SPEED], [0, 360], {
    clamp: false,
  });

  // We use a single transform to calculate all geometry to ensure synchronization
  // and avoid layout thrashing.
  const geometry = useTransform(rotateY, (angle) => {
    // 1. Calculate positions of the two faces (Front and Back) in 3D space
    // Face A is at Z = +thickness/2, Face B is at Z = -thickness/2
    const centerA = projectPoint(0, COIN_THICKNESS / 2, angle);
    const centerB = projectPoint(0, -COIN_THICKNESS / 2, angle);

    // 2. Calculate scaling factor based on rotation (cos theta)
    // Both faces rotate at the same speed, so width is derived from global angle
    const rad = (angle * Math.PI) / 180;
    const widthFactor = Math.abs(Math.cos(rad));
    const rx = COIN_RADIUS * widthFactor;

    // 3. Define the disks
    const diskA: ProjectedDisk = {
      cx: centerA.x,
      rx,
      zIndex: centerA.z,
      isFront: true,
    };

    const diskB: ProjectedDisk = {
      cx: centerB.x,
      rx,
      zIndex: centerB.z,
      isFront: false,
    };

    // 4. Sort: The one with smaller Z is behind. The one with larger Z is in front.
    // In our coordinate system, +Z is towards viewer (standard right-hand rule modified for screen).
    // Actually, let's assume standard 3D: +Z is towards viewer.
    const sorted = [diskA, diskB].sort((a, b) => a.zIndex - b.zIndex);
    const backDisk = sorted[0];
    const frontDisk = sorted[1];

    // 5. Generate Side Path
    const sidePath = calculateSidePath(frontDisk, backDisk);

    // 6. Calculate Sparkle Position
    // Sparkle should appear on the "leading edge" of the rim when it turns towards us.
    // We position it on the outer edge of the front disk.
    // We only show it when the coin is somewhat angled to catch the "light".
    const isEdgeVisible = widthFactor < 0.9 && widthFactor > 0.1;
    // Determine left or right edge based on rotation direction
    const sparkleX = frontDisk.cx - frontDisk.rx; // Left edge
    const sparkleOpacity = isEdgeVisible ? 1 - widthFactor : 0;

    return {
      backDisk,
      frontDisk,
      sidePath,
      sparkle: { x: sparkleX, y: -COIN_RADIUS * 0.5, opacity: sparkleOpacity }, // Offset y slightly for aesthetic
    };
  });

  // Extract values for rendering
  const sidePath = useTransform(geometry, (g) => g.sidePath);

  // Back Face
  const backCx = useTransform(geometry, (g) => g.backDisk.cx);
  const backRx = useTransform(geometry, (g) => g.backDisk.rx);

  // Front Face
  const frontCx = useTransform(geometry, (g) => g.frontDisk.cx);
  const frontRx = useTransform(geometry, (g) => g.frontDisk.rx);

  // Sparkle
  const sparkleX = useTransform(geometry, (g) => g.sparkle.x);
  const sparkleY = useTransform(geometry, (g) => g.sparkle.y);
  const sparkleOp = useTransform(geometry, (g) => g.sparkle.opacity);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="300"
        height="300"
        viewBox="-150 -150 300 300"
        style={{ overflow: "visible" }}
      >
        <CoinFaceDefinition />
        {/* 1. Draw the Back Face (partially hidden) */}
        {/* We stroke it with the rim gradient to make the edge blend */}
        <motion.ellipse
          cx={backCx}
          cy={0}
          rx={backRx}
          ry={COIN_RADIUS}
          fill="url(#faceGradient)"
          stroke="url(#rimGradient)"
          strokeWidth={2}
        />
        {/* 2. Draw the Side (Thickness/Rim) */}
        {/* This connects the back and front faces. */}
        <motion.path d={sidePath} fill="url(#rimGradient)" stroke="none" />
        {/* 3. Draw the Front Face */}
        <motion.ellipse
          cx={frontCx}
          cy={0}
          rx={frontRx}
          ry={COIN_RADIUS}
          fill="url(#faceGradient)"
          // The stroke acts as the sharp edge highlight
          stroke="url(#rimGradient)"
          strokeWidth={1.5}
        />
        {/* 4. The "Sparkle" Highlight */}
        <Sparkle x={0} y={0} opacity={0} />{" "}
        {/* Placeholder to satisfy TS if not using MotionComponent properly below */}
        <motion.g
          style={{
            x: sparkleX,
            y: sparkleY,
            opacity: sparkleOp,
          }}
        >
          {/* Re-using the sparkle logic inside a motion group for performance */}
          <path
            d={`M0 -20 Q0 0 20 0 Q0 0 0 20 Q0 0 -20 0 Q0 0 0 -20`}
            fill="white"
            filter="url(#glow)"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default RobinhoodCoin3D;
