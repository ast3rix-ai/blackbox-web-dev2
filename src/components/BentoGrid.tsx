"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import {
  Code2,
  Globe,
  Zap,
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  Rocket,
  Calendar,
  Users,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

// Tech Stack Icons with colors
const techStack = [
  { icon: Code2, name: "TypeScript", color: "#3178c6" },
  { icon: Layers, name: "React", color: "#61dafb" },
  { icon: Globe, name: "Next.js", color: "#ffffff" },
  { icon: Cpu, name: "Python", color: "#3776ab" },
  { icon: Database, name: "PostgreSQL", color: "#336791" },
  { icon: Zap, name: "Node.js", color: "#68a063" },
];

// Services data
const services = [
  {
    id: "web",
    titleKey: "bento.services.web.title",
    descKey: "bento.services.web.desc",
    gradient: "from-cyan-500/20 via-transparent to-transparent",
    href: "/services/web-development",
  },
  {
    id: "bots",
    titleKey: "bento.services.bots.title",
    descKey: "bento.services.bots.desc",
    gradient: "from-purple-500/20 via-transparent to-transparent",
    href: "/services/ai-bots",
  },
  {
    id: "design",
    titleKey: "bento.services.design.title",
    descKey: "bento.services.design.desc",
    gradient: "from-pink-500/20 via-transparent to-transparent",
    href: "/services/ui-ux-design",
  },
];

// Draggable Tech Icon Component - smooth floating + drag
function DraggableTechIcon({
  tech,
  containerRef,
  index,
}: {
  tech: (typeof techStack)[0];
  containerRef: React.RefObject<HTMLDivElement | null>;
  index: number;
}) {
  const Icon = tech.icon;
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);

  // Random starting position - generated once on mount
  const [randomOffset] = useState(() => ({
    x: (Math.random() - 0.5) * 60,
    y: (Math.random() - 0.5) * 40,
  }));

  // Base grid positions with random offset
  const col = index % 3;
  const row = Math.floor(index / 3);
  const baseX = (col - 1) * 90 + randomOffset.x;
  const baseY = (row - 0.5) * 50 + 20 + randomOffset.y;

  // Very slow floating animation params
  const animDuration = 20 + index * 5; // 20-45 seconds
  const animDelay = index * -4;

  // Floating keyframes - small gentle movements
  const floatX = [0, 12, -8, 10, -6, 0];
  const floatY = [0, -10, 6, -5, 8, 0];

  return (
    <motion.div
      // Pre-calculate layout for instant drag start
      layout={false}
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      dragMomentum={true}
      dragTransition={{
        bounceStiffness: 150,
        bounceDamping: 15,
        power: 0.3
      }}
      // Stop animation immediately on pointer down (before drag starts)
      onPointerDown={() => {
        if (!wasDragged) {
          setWasDragged(true);
        }
      }}
      onDragStart={() => {
        setIsDragging(true);
      }}
      onDragEnd={() => setIsDragging(false)}
      initial={{
        opacity: 0,
        scale: 0.5,
        x: baseX,
        y: baseY
      }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.12 : 1,
        x: wasDragged ? undefined : floatX.map(v => baseX + v),
        y: wasDragged ? undefined : floatY.map(v => baseY + v),
      }}
      transition={{
        opacity: { delay: index * 0.1, duration: 0.5 },
        scale: { duration: 0.2, ease: "easeOut" },
        x: wasDragged ? { duration: 0 } : {
          duration: animDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animDelay,
        },
        y: wasDragged ? { duration: 0 } : {
          duration: animDuration * 0.9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: animDelay,
        },
      }}
      whileHover={{ scale: 1.06 }}
      whileDrag={{ scale: 1.15, zIndex: 50 }}
      style={{
        zIndex: isDragging ? 50 : 10,
        willChange: "transform",
      }}
      className="absolute cursor-grab active:cursor-grabbing select-none"
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800"
        style={{
          boxShadow: isDragging
            ? `0 0 28px ${tech.color}50, 0 10px 20px rgba(0,0,0,0.5)`
            : `0 0 18px ${tech.color}25, 0 4px 12px rgba(0,0,0,0.25)`,
          transform: "translateZ(0)",
          transition: "box-shadow 0.25s ease-out",
        }}
      >
        <Icon className="w-5 h-5" style={{ color: tech.color }} />
        <span className="text-sm font-medium text-zinc-300">{tech.name}</span>
      </div>
    </motion.div>
  );
}

// GPU-accelerated Card with smooth 120fps hover
function GlowCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-zinc-900/90 border border-zinc-800/80 overflow-hidden group",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay }}
      style={{
        transform: "translateZ(0)", // Force GPU layer
        backfaceVisibility: "hidden",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Hover overlay - uses opacity for GPU acceleration */}
      <div
        className="absolute inset-0 bg-zinc-800/30 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />
      {/* Border glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl border border-zinc-600/50 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "opacity",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// About Card with animated tagline
const TAGLINE_WORDS = ["bento.about.grow", "bento.about.scale", "bento.about.innovate", "bento.about.succeed"];

function AboutCard() {
  const { t } = useTranslation();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % TAGLINE_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const capabilities = [
    { label: t('bento.capabilities.web'), icon: Globe },
    { label: t('bento.capabilities.ai'), icon: Cpu },
    { label: t('bento.capabilities.cloud'), icon: Zap },
  ];

  return (
    <GlowCard className="p-6 md:p-8 h-full" delay={0}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
            <span className="text-xl font-black text-black tracking-tighter">B</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">BLACKBOX</h3>
            <p className="text-sm text-zinc-500">{t('bento.about.role')}</p>
          </div>
        </div>

        <p className="text-zinc-400 leading-relaxed mb-4">
          {t('bento.about.description')}{" "}
          <span className="text-cyan-400">{t('bento.about.convert')}</span>.
        </p>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg group"
              style={{ transform: "translateZ(0)" }}
            >
              <div className="absolute inset-0 rounded-lg bg-zinc-800/50 border border-zinc-700/50" />
              <div
                className="absolute inset-0 rounded-lg bg-zinc-800/80 border border-cyan-500/30 opacity-0 group-hover:opacity-100"
                style={{
                  transition: "opacity 120ms ease-out",
                  willChange: "opacity",
                }}
              />
              <cap.icon className="relative z-10 w-4 h-4 text-cyan-400" />
              <span className="relative z-10 text-xs text-zinc-300">{cap.label}</span>
            </div>
          ))}
        </div>

        {/* Animated tagline */}
        <div className="mt-auto pt-4 border-t border-zinc-800/50">
          <p className="text-sm text-zinc-500 flex items-center gap-1">
            {t('bento.about.tagline_prefix')}
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-cyan-400 font-medium"
              >
                {t(TAGLINE_WORDS[wordIndex] as any)}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>
      </div>
    </GlowCard>
  );
}

// Tech Stack Gravity Card
function TechStackCard() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <GlowCard className="p-6 md:p-8 h-full min-h-[340px]" delay={0.2}>
      <h3 className="text-lg font-semibold mb-2 text-white">{t('bento.tech.title')}</h3>
      <p className="text-sm text-zinc-500 mb-6">
        {t('bento.tech.drag')}
      </p>

      <div
        ref={containerRef}
        className="relative h-56 flex items-start justify-center pt-8"
      >
        {techStack.map((tech, index) => (
          <DraggableTechIcon
            key={tech.name}
            tech={tech}
            containerRef={containerRef}
            index={index}
          />
        ))}
      </div>
    </GlowCard>
  );
}

// Services Card - Premium hover effect with navigation
function ServicesCard() {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <GlowCard className="p-6 md:p-8 h-full" delay={0.3}>
      <h3 className="text-lg font-semibold mb-4 text-white">{t('bento.services.title')}</h3>

      <div className="flex flex-col gap-4">
        {services.map((service) => (
          <Link key={service.id} href={service.href}>
            <motion.div
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center justify-between p-4 rounded-xl cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Base background */}
              <div className="absolute inset-0 rounded-xl bg-zinc-800/40" />

              {/* Gradient glow on hover */}
              <motion.div
                className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-r",
                  service.gradient
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === service.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Subtle border */}
              <motion.div
                className="absolute inset-0 rounded-xl border"
                initial={{ borderColor: "rgba(63, 63, 70, 0.5)" }}
                animate={{
                  borderColor: hoveredId === service.id
                    ? "rgba(0, 245, 255, 0.3)"
                    : "rgba(63, 63, 70, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.h4
                  className="font-medium"
                  animate={{
                    color: hoveredId === service.id ? "#00f5ff" : "#ffffff"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {t(service.titleKey as any)}
                </motion.h4>
                <p className="text-sm text-zinc-500">{t(service.descKey as any)}</p>
              </div>

              <motion.div
                className="relative z-10"
                animate={{
                  x: hoveredId === service.id ? 4 : 0,
                  y: hoveredId === service.id ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                    hoveredId === service.id ? "text-cyan-400" : "text-zinc-600"
                  )}
                />
              </motion.div>
            </motion.div>
          </Link>
        ))}
      </div>
    </GlowCard>
  );
}

// Track Record Card - GPU-accelerated hover
function TrackRecordCard() {
  const { t } = useTranslation();
  const achievements = [
    { metric: "50+", label: t('bento.track.projects'), Icon: Rocket, color: "text-cyan-400" },
    { metric: "5+", label: t('bento.track.years'), Icon: Calendar, color: "text-purple-400" },
    { metric: "30+", label: t('bento.track.clients'), Icon: Users, color: "text-pink-400" },
    { metric: "12", label: t('bento.track.industries'), Icon: Building2, color: "text-emerald-400" },
  ];

  return (
    <GlowCard className="p-6 md:p-8 h-full" delay={0.1}>
      <h3 className="text-lg font-semibold mb-4 text-white">{t('bento.track.title')}</h3>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            className="relative p-3 rounded-xl text-center group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.1 }}
            style={{ transform: "translateZ(0)" }}
          >
            {/* Background layers for GPU-accelerated hover */}
            <div className="absolute inset-0 rounded-xl bg-zinc-800/30 border border-zinc-700/30" />
            <div
              className="absolute inset-0 rounded-xl bg-zinc-800/50 border border-zinc-600/50 opacity-0 group-hover:opacity-100"
              style={{
                transition: "opacity 120ms ease-out",
                willChange: "opacity",
              }}
            />

            <div className="relative z-10">
              <item.Icon className={cn("w-5 h-5 mx-auto mb-1", item.color)} />
              <p className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {item.metric}
              </p>
              <p className="text-xs text-zinc-500 mt-1">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </GlowCard>
  );
}

// Main Bento Grid
export default function BentoGrid() {
  const { t } = useTranslation();
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          {t('bento.showcase.prefix')} <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{t('bento.showcase.highlight')}</span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto">
          {t('bento.showcase.description')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <AboutCard />
        </div>
        <div>
          <TrackRecordCard />
        </div>
        <div>
          <TechStackCard />
        </div>
        <div className="lg:col-span-2">
          <ServicesCard />
        </div>
      </div>
    </section>
  );
}
