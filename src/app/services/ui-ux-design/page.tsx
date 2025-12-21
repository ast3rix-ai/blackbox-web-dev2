"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Palette,
  Sparkles,
  Moon,
  Hand,
  Play,
  Heart,
  Music,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Aurora Mesh Background
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated aurora blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
      <AuroraBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-pink-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t('common.back_home')}</span>
          </Link>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-pink-500/30 bg-pink-500/5"
        >
          <Palette className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-pink-400">{t('ui.hero.badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">{t('ui.hero.title.prefix')}</span>
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {t('ui.hero.title.highlight')}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('ui.hero.description')}
        </motion.p>
      </div>
    </section>
  );
}

// Music App UI for Phone Screen
function MusicAppUI() {
  const { t } = useTranslation();
  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 via-zinc-900 to-purple-950 p-4 flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-4">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-2 rounded-sm bg-zinc-600" />
          <div className="w-4 h-2 rounded-sm bg-zinc-600" />
          <div className="w-6 h-3 rounded-sm bg-green-500" />
        </div>
      </div>

      {/* Album Art */}
      <motion.div
        className="flex-1 flex items-center justify-center mb-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 shadow-2xl shadow-purple-500/30 flex items-center justify-center">
          <Music className="w-16 h-16 text-white/80" />
        </div>
      </motion.div>

      {/* Track Info */}
      <div className="text-center mb-4">
        <h3 className="text-white font-semibold text-sm">{t('ui.app.song')}</h3>
        <p className="text-zinc-500 text-xs">{t('ui.app.artist')}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "65%" }}
            transition={{ duration: 2, delay: 0.8 }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
          <span>2:34</span>
          <span>3:45</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <Shuffle className="w-4 h-4 text-zinc-500" />
        <SkipBack className="w-5 h-5 text-zinc-300" />
        <motion.div
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-5 h-5 text-zinc-900 ml-0.5" />
        </motion.div>
        <SkipForward className="w-5 h-5 text-zinc-300" />
        <Repeat className="w-4 h-4 text-zinc-500" />
      </div>

      {/* Like Button */}
      <motion.div
        className="flex justify-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
      </motion.div>
    </div>
  );
}

// 3D Phone Component
function ThreeDPhone() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Shadow offset (opposite direction)
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="px-6 py-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('ui.showcase.title.prefix')} <span className="text-pink-400">{t('ui.showcase.title.highlight')}</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t('ui.showcase.description')}
          </p>
        </motion.div>

        {/* 3D Phone Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex justify-center items-center h-[600px] cursor-grab active:cursor-grabbing"
          style={{ perspective: "1000px" }}
        >
          {/* Dynamic Shadow */}
          <motion.div
            className="absolute w-48 h-96 rounded-[3rem] bg-black/40 blur-3xl"
            style={{
              x: shadowX,
              y: shadowY,
              scale: 0.9,
            }}
          />

          {/* Phone Frame */}
          <motion.div
            className="relative"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Phone Bezel */}
            <div
              className="relative w-[280px] h-[580px] rounded-[3rem] p-3"
              style={{
                background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)",
                boxShadow: `
                  inset 0 1px 1px rgba(255,255,255,0.1),
                  inset 0 -1px 1px rgba(0,0,0,0.5),
                  0 0 0 1px rgba(255,255,255,0.05)
                `,
              }}
            >
              {/* Metallic Edge */}
              <div
                className="absolute inset-0 rounded-[3rem] pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                }}
              />

              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-900 ring-1 ring-zinc-700" />
              </div>

              {/* Screen */}
              <div
                className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-black"
                style={{
                  boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
                }}
              >
                <MusicAppUI />
              </div>

              {/* Side Button (Volume) */}
              <div className="absolute -left-1 top-28 w-1 h-8 bg-zinc-700 rounded-l-sm" />
              <div className="absolute -left-1 top-40 w-1 h-12 bg-zinc-700 rounded-l-sm" />

              {/* Side Button (Power) */}
              <div className="absolute -right-1 top-32 w-1 h-16 bg-zinc-700 rounded-r-sm" />
            </div>

            {/* Floating UI Elements (3D Depth) */}
            <motion.div
              className="absolute -top-4 -right-8 px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-medium backdrop-blur-sm"
              style={{ transform: "translateZ(40px)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                60 FPS
              </span>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-12 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium backdrop-blur-sm"
              style={{ transform: "translateZ(30px)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="flex items-center gap-1">
                <Moon className="w-3 h-3" />
                {t('ui.showcase.dark_mode')}
              </span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-16 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-medium backdrop-blur-sm"
              style={{ transform: "translateZ(50px)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="flex items-center gap-1">
                <Hand className="w-3 h-3" />
                {t('ui.showcase.gestures')}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Design Philosophy Section
function DesignPhilosophy() {
  const { t } = useTranslation();
  const principles = [
    {
      icon: Play,
      title: t('ui.philosophy.motion.title'),
      description: t('ui.philosophy.motion.desc'),
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },
    {
      icon: Moon,
      title: t('ui.philosophy.dark.title'),
      description: t('ui.philosophy.dark.desc'),
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Hand,
      title: t('ui.philosophy.thumb.title'),
      description: t('ui.philosophy.thumb.desc'),
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
  ];

  return (
    <section className="px-6 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('ui.philosophy.title.prefix')} <span className="text-pink-400">{t('ui.philosophy.title.highlight')}</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t('ui.philosophy.description')}
          </p>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className={`relative p-8 rounded-2xl bg-zinc-900/50 border ${principle.borderColor} group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5, borderColor: principle.color }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl ${principle.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl ${principle.bgColor} flex items-center justify-center mb-6`}>
                <principle.icon className={`w-7 h-7 ${principle.color}`} />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-white mb-3">{principle.title}</h3>
              <p className="relative text-zinc-400 leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tool Stack
const toolStack = [
  { name: "Figma", icon: "🎨" },
  { name: "Framer", icon: "🔲" },
  { name: "Spline", icon: "🌀" },
  { name: "Principle", icon: "▶️" },
  { name: "After Effects", icon: "🎬" },
  { name: "Blender", icon: "🧊" },
];

// Tool Stack Marquee
function ToolStackMarquee() {
  return (
    <section className="py-20 overflow-hidden border-y border-zinc-800">
      <motion.div
        className="flex gap-12"
        animate={{ x: [0, -1200] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[...toolStack, ...toolStack, ...toolStack].map((tool, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 whitespace-nowrap"
          >
            <span className="text-2xl">{tool.icon}</span>
            <span className="text-zinc-300 font-medium">{tool.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="px-6 py-32">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Floating palette */}
        <motion.div
          className="inline-block mb-6"
          animate={{
            rotate: [0, 5, -5, 0],
            y: [0, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Palette className="w-12 h-12 text-pink-400" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('ui.cta.title.prefix')}{" "}
          <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {t('ui.cta.title.highlight')}
          </span>
          {t('ui.cta.title.suffix')}
        </h2>
        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
          {t('ui.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hire-us"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {t('ui.cta.button.start')}
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-xl border border-zinc-700 text-white font-semibold hover:bg-zinc-800 transition-colors"
          >
            {t('ui.cta.button.view')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// Main Page Component
export default function UIUXDesignPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <HeroSection />
      <ThreeDPhone />
      <DesignPhilosophy />
      <ToolStackMarquee />
      <CTASection />
    </div>
  );
}

