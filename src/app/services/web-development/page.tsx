"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Database,
  Gauge,
  Layers,
  Workflow,
  Zap,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Grid Beam Background - Static, GPU-optimized version
function GridBeamBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static vertical grid lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
          style={{
            left: `${(i + 1) * 15}%`,
            opacity: 0.3 + (i % 2) * 0.2,
          }}
        />
      ))}
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
    </div>
  );
}


// Hero Section
function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
      <GridBeamBackground />

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
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors"
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
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/5"
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400">{t('web.hero.badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">{t('web.hero.title.prefix')}</span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t('web.hero.title.highlight')}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('web.hero.description')}
        </motion.p>
      </div>
    </section>
  );
}

// Browser Window Component
function BrowserWindow({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/90 shadow-2xl shadow-black/50">
      {/* Browser Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        {/* Traffic Light Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* URL Bar */}
        <div className="flex-1 mx-4">
          <div className="px-4 py-1.5 rounded-md bg-zinc-800 text-zinc-500 text-sm font-mono">
            {t('web.browser.url' as any)}
          </div>
        </div>
      </div>
      {/* Browser Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

// Mock Dashboard UI inside Browser
function MockDashboardUI() {
  const { t } = useTranslation();
  return (
    <div className="p-6 bg-zinc-950 min-h-[400px]">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
          <div>
            <div className="h-4 w-24 bg-zinc-800 rounded" />
            <div className="h-3 w-16 bg-zinc-800/50 rounded mt-1" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 text-sm">{t('web.browser.settings' as any)}</div>
          <div className="px-4 py-2 rounded-lg bg-cyan-500 text-white text-sm">{t('web.browser.deploy' as any)}</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: t('web.dashboard.revenue' as any), value: "$124,500", change: "+12.5%" },
          { label: t('web.dashboard.users' as any), value: "8,420", change: "+8.2%" },
          { label: t('web.dashboard.conversion' as any), value: "3.24%", change: "+2.1%" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-zinc-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            <p className="text-cyan-400 text-sm mt-1">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Code Snippet Area */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-zinc-500">{"// Real-time analytics hook"}</span>
        </div>
        <div>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-cyan-400">useAnalytics</span>{" "}
          <span className="text-white">=</span>{" "}
          <span className="text-yellow-400">()</span>{" "}
          <span className="text-purple-400">=&gt;</span>{" "}
          <span className="text-yellow-400">{"{"}</span>
        </div>
        <div className="pl-4">
          <span className="text-purple-400">return</span>{" "}
          <span className="text-cyan-400">useQuery</span>
          <span className="text-yellow-400">(</span>
          <span className="text-green-400">&apos;analytics&apos;</span>
          <span className="text-yellow-400">)</span>
        </div>
        <div>
          <span className="text-yellow-400">{"}"}</span>
        </div>
      </div>
    </div>
  );
}

// Parallax Browser Showcase Section
function ParallaxShowcase() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <section ref={containerRef} className="relative px-6 py-32">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('web.showcase.title.prefix')} <span className="text-cyan-400">{t('web.showcase.title.highlight')}</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t('web.showcase.description')}
          </p>
        </motion.div>

        {/* 3D Browser Window */}
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            y,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          className="will-change-transform"
        >
          <BrowserWindow>
            <MockDashboardUI />
          </BrowserWindow>
        </motion.div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const { t } = useTranslation();
  const steps = [
    {
      number: "01",
      title: t('web.process.step1.title'),
      description: t('web.process.step1.desc'),
      icon: Workflow,
      color: "text-cyan-400",
    },
    {
      number: "02",
      title: t('web.process.step2.title'),
      description: t('web.process.step2.desc'),
      icon: Layers,
      color: "text-purple-400",
    },
    {
      number: "03",
      title: t('web.process.step3.title'),
      description: t('web.process.step3.desc'),
      icon: Gauge,
      color: "text-pink-400",
    },
  ];

  return (
    <section className="px-6 py-32 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('web.process.title.prefix')} <span className="text-gradient">{t('web.process.title.highlight')}</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t('web.process.description')}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 group hover:border-zinc-700 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Step Number */}
              <span className={`text-6xl font-bold ${step.color} opacity-20 absolute top-4 right-4`}>
                {step.number}
              </span>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 ${step.color}`}>
                <step.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tech Stack Icons
const techStack = [
  { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛" },
  { name: "Tailwind", icon: "🎨" },
  { name: "TypeScript", icon: "TS" },
  { name: "Node.js", icon: "⬢" },
  { name: "PostgreSQL", icon: "🐘" },
];

// Infinite Marquee Component
function TechStackMarquee() {
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
        {/* Duplicate items for seamless loop */}
        {[...techStack, ...techStack, ...techStack].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 whitespace-nowrap"
          >
            <span className="text-2xl">{tech.icon}</span>
            <span className="text-zinc-300 font-medium">{tech.name}</span>
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
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('web.cta.title.prefix')}{" "}
          <span className="text-gradient">{t('web.cta.title.highlight')}</span>
          {t('web.cta.title.suffix')}
        </h2>
        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
          {t('web.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hire-us"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {t('web.cta.button.start')}
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-xl border border-zinc-700 text-white font-semibold hover:bg-zinc-800 transition-colors"
          >
            {t('web.cta.button.view')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// Main Page Component
export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <HeroSection />
      <ParallaxShowcase />
      <ProcessSection />
      <TechStackMarquee />
      <CTASection />
    </div>
  );
}

