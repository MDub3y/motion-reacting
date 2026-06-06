"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

export const IridescentBell = () => {
  // 1. Bell Swing Animation
  // Simulates a heavy object swinging from a pivot point
  const bellVariants: Variants = {
    idle: { rotate: 0 },
    ringing: {
      rotate: [0, 15, -12, 10, -8, 5, -3, 0],
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  // 2. Clapper (Ball) Physics
  // This swings *relative* to the bell. When bell goes left, ball goes right (inertia).
  const clapperVariants: Variants = {
    idle: { x: 0, rotate: 0 },
    ringing: {
      x: [0, -15, 12, -8, 6, -3, 1, 0], // Counter-movement to bell
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  // 3. Sparkle Animation (blinking and rotating)
  const sparkleVariants: Variants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 90, 180],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
    },
  };

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/40 blur-[80px]" />

      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="z-10"
      >
        <defs>
          {/* 
            --- MATERIALS --- 
            To get the 3D ridge look, we use a gradient with MANY stops.
            The alternating light/dark stops simulate the light hitting rounded ribs.
          */}
          <linearGradient
            id="metal-ridges"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0.00" stopColor="#1a103c" /> {/* Dark edge */}
            <stop offset="0.08" stopColor="#3b0764" /> {/* Deep Purple */}
            <stop offset="0.15" stopColor="#6d28d9" /> {/* Lighter Purple */}
            <stop offset="0.20" stopColor="#1e1b4b" /> {/* Shadow (Valley) */}
            <stop offset="0.25" stopColor="#3b82f6" /> {/* Blue Ridge */}
            <stop offset="0.32" stopColor="#172554" /> {/* Shadow */}
            <stop offset="0.38" stopColor="#06b6d4" /> {/* Cyan Ridge */}
            <stop offset="0.45" stopColor="#1e1b4b" /> {/* Shadow */}
            <stop offset="0.50" stopColor="#fbbf24" />{" "}
            {/* Gold Ridge (Center highlight) */}
            <stop offset="0.58" stopColor="#4c0519" /> {/* Dark Red Shadow */}
            <stop offset="0.65" stopColor="#d946ef" /> {/* Magenta Ridge */}
            <stop offset="0.72" stopColor="#4a044e" /> {/* Shadow */}
            <stop offset="0.80" stopColor="#8b5cf6" /> {/* Violet Ridge */}
            <stop offset="0.90" stopColor="#2e1065" /> {/* Deep Purple */}
            <stop offset="1.00" stopColor="#020617" /> {/* Dark edge */}
          </linearGradient>

          {/* Gold/Rainbow Rim Gradient */}
          <linearGradient id="rim-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c026d3" />
            <stop offset="25%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="75%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          {/* Interior Gradient (Dark & Shadowy) */}
          <radialGradient id="interior-darkness" cx="0.5" cy="0.1" r="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2e1065" stopOpacity="0.95" />
          </radialGradient>

          {/* Clapper (Marble) Gradient */}
          <radialGradient id="marble-gradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#67e8f9" /> {/* Highlight */}
            <stop offset="30%" stopColor="#d946ef" /> {/* Pink */}
            <stop offset="70%" stopColor="#4338ca" /> {/* Indigo */}
            <stop offset="100%" stopColor="#1e1b4b" /> {/* Shadow */}
          </radialGradient>

          {/* Glow Filter for Sparkles */}
          <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* --- PIVOT GROUP --- 
            We rotate everything from the top handle (approx 200, 80) 
        */}
        <motion.g
          initial="idle"
          animate="ringing"
          variants={bellVariants}
          style={{ originX: "200px", originY: "80px" }} // Pivot point
        >
          {/* 1. HANDLE RING */}
          <g transform="translate(200, 75)">
            {/* Back part of ring */}
            <path
              d="M -16 0 A 16 8 0 0 1 16 0"
              stroke="url(#rim-gradient)"
              strokeWidth="4"
              fill="none"
              opacity="0.8"
            />
            {/* Front part of ring */}
            <path
              d="M -16 0 A 16 8 0 0 0 16 0"
              stroke="url(#rim-gradient)"
              strokeWidth="4"
              fill="none"
            />
            {/* Connection Ball */}
            <circle cx="0" cy="8" r="8" fill="url(#metal-ridges)" />
          </g>

          {/* 2. INTERIOR & REAR RIM (Layered Behind) */}
          {/* This ellipse represents the opening of the bell */}
          <ellipse
            cx="200"
            cy="280"
            rx="98"
            ry="25"
            fill="url(#interior-darkness)"
          />
          {/* Rear Rim Stroke (darker) */}
          <path
            d="M 102 280 A 98 25 0 0 1 298 280"
            stroke="#4c1d95"
            strokeWidth="2"
            fill="none"
          />

          {/* 3. THE CLAPPER (Pendulum Ball) */}
          <motion.g
            variants={clapperVariants}
            style={{ originX: "200px", originY: "80px" }}
          >
            {/* The Stick */}
            <line
              x1="200"
              y1="180"
              x2="200"
              y2="280"
              stroke="#4c1d95"
              strokeWidth="6"
              opacity="0.5"
            />
            {/* The Marble Ball */}
            <circle
              cx="200"
              cy="285"
              r="22"
              fill="url(#marble-gradient)"
              className="drop-shadow-lg"
            />
            {/* Marble Highlight */}
            <circle
              cx="192"
              cy="278"
              r="6"
              fill="white"
              opacity="0.4"
              filter="url(#bloom)"
            />
          </motion.g>

          {/* 4. MAIN BELL BODY */}
          {/* 
             Complex Path:
             Start top-center -> Rounded Shoulder -> Pinched Waist -> Flared Skirt -> Bottom Curve
          */}
          <path
            d="
              M 175 80                  
              C 160 80, 140 120, 135 150  
              C 130 180, 110 220, 102 280 
              C 102 280, 200 305, 298 280 
              C 290 220, 270 180, 265 150 
              C 260 120, 240 80, 225 80   
              Z
            "
            fill="url(#metal-ridges)"
          />

          {/* 5. FRONT RIM (The shiny lip) */}
          <path
            d="M 102 280 A 98 25 0 0 0 298 280"
            stroke="url(#rim-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Rim Highlight Line (Thin white line on top of rim) */}
          <path
            d="M 105 280 A 95 23 0 0 0 295 280"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            fill="none"
            filter="url(#bloom)"
          />

          {/* 6. SURFACE REFLECTIONS (Fake Environment Mapping) */}
          {/* These translucent white strokes accent the curves to make it look glossy */}
          <path
            d="M 150 100 Q 140 180 120 260"
            stroke="cyan"
            strokeWidth="2"
            opacity="0.2"
            fill="none"
            filter="url(#bloom)"
          />
          <path
            d="M 250 100 Q 260 180 280 260"
            stroke="magenta"
            strokeWidth="2"
            opacity="0.2"
            fill="none"
            filter="url(#bloom)"
          />

          {/* Center Shine */}
          <path
            d="M 190 90 Q 200 180 195 270"
            stroke="white"
            strokeWidth="15"
            opacity="0.1"
            fill="none"
            style={{ mixBlendMode: "overlay" }}
          />

          {/* 7. SPARKLES (Attached to Bell) */}
          {/* Sparkle 1: Top Right Shoulder */}
          <motion.g
            transform="translate(250, 140)"
            variants={sparkleVariants}
            custom={0}
          >
            <path
              d="M0 -10 L0 10 M-10 0 L10 0"
              stroke="white"
              strokeWidth="2"
              filter="url(#bloom)"
            />
            <circle r="2" fill="white" filter="url(#bloom)" />
          </motion.g>

          {/* Sparkle 2: Bottom Rim Left */}
          <motion.g
            transform="translate(105, 275)"
            variants={sparkleVariants}
            transition={{ delay: 0.5 }}
          >
            <path
              d="M0 -8 L0 8 M-8 0 L8 0"
              stroke="white"
              strokeWidth="2"
              filter="url(#bloom)"
            />
            <circle r="2" fill="white" filter="url(#bloom)" />
          </motion.g>
        </motion.g>{" "}
        {/* End Pivot Group */}
        {/* 8. FLOATING SPARKLE (Independent of Swing) */}
        <motion.g
          transform="translate(200, 60)"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <path
            d="M0 -12 L0 12 M-12 0 L12 0"
            stroke="white"
            strokeWidth="2"
            filter="url(#bloom)"
            opacity="0.8"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};
