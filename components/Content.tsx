/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { IconRocket } from "@tabler/icons-react";
import {
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useRef, useState } from "react";

export function MotionHooksExample() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgrounds = ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6"];

  const [background, setBackground] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const finalValue = Math.floor(latest * backgrounds.length);
    setBackground(backgrounds[finalValue]);
  });

  return (
    <motion.div
      ref={containerRef}
      animate={{
        background,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="flex min-h-screen items-center justify-center bg-neutral-900"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-10 py-40">
        {features.map((feature, idx) => (
          <Card key={feature.title} feature={feature} />
        ))}
      </div>
    </motion.div>
  );
}

const Card = ({ feature }: { feature: Feature }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateContent = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -300]),
    {
      stiffness: 100,
      damping: 30,
      mass: 1,
    },
  );
  const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const blur = useTransform(scrollYProgress, [0.5, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);

  return (
    <div
      ref={ref}
      key={feature.title}
      className="grid grid-cols-2 items-center gap-20 py-40"
    >
      <motion.div
        style={{
          scale: scale,
          filter: useMotionTemplate`blur(${blur}px)`,
        }}
        className="flex flex-col gap-5"
      >
        {feature.icon}
        <h2 className="text-4xl font-bold text-white">{feature.title}</h2>
        <p className="text-lg text-neutral-400">{feature.description}</p>
      </motion.div>
      <motion.div
        style={{
          y: translateContent,
          opacity: opacityContent,
        }}
      >
        {feature.content}
      </motion.div>
    </div>
  );
};

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  content: React.ReactNode;
};

const features: Feature[] = [
  {
    icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
    title: "Generate Ultra Realistic Images in seconds",
    description:
      "With our state of the art AI, you can generate ultra realistic images in no time at all.",
    content: (
      <div>
        <Image
          src="/car-1.jpg"
          alt="car"
          height={"500"}
          width={"500"}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
    title: "Instant Concept /car Visuals",
    description:
      "Visualize your custom /car builds—like this classic red Mustang—using AI-powered rendering.",
    content: (
      <div>
        <Image
          src="/car-2.jpg"
          alt="red mustang ai generation"
          height={"500"}
          width={"500"}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
    title: "Create Marketing-Ready Images Instantly",
    description:
      "Generate clean, high-resolution imagery perfect for ads and social campaigns—no photo shoot needed.",
    content: (
      <div>
        <Image
          src="/car-3.jpg"
          alt="mustang marketing render"
          height={"500"}
          width={"500"}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
    title: "Customize Lighting & Angles with AI",
    description:
      "Easily change environments, lighting, or camera angles—like this moody blue Mustang shot.",
    content: (
      <div>
        <Image
          src="/car-4.jpg"
          alt="blue mustang ai lighting"
          height={"500"}
          width={"500"}
          className="rounded-lg"
        />
      </div>
    ),
  },
  {
    icon: <IconRocket className="h-8 w-8 text-neutral-200" />,
    title: "From Prompt to Production in Moments",
    description:
      "Turn a simple text prompt into production-grade visuals—like this matte grey Mustang example.",
    content: (
      <div>
        <Image
          src="/car-5.jpg"
          alt="matte grey mustang ai render"
          height={"500"}
          width={"500"}
          className="rounded-lg"
        />
      </div>
    ),
  },
];
