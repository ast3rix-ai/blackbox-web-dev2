"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  Brain,
  Zap,
  Database,
  MessageSquare,
  Users,
  FileSearch,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Neural Network Background Animation
function NeuralNetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Pulsing radial gradients - breathing brain effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Neural connection lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          style={{
            width: "400px",
            transformOrigin: "left center",
            rotate: `${i * 45}deg`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Hero Section
function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-20">
      <NeuralNetworkBackground />

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
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-purple-400 transition-colors"
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
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-purple-500/30 bg-purple-500/5"
        >
          <Bot className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-400">{t('ai.hero.badge')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">{t('ai.hero.title.prefix')}</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            {t('ai.hero.title.highlight')}
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t('ai.hero.description')}
        </motion.p>
      </div>
    </section>
  );
}

// Chat Logic Demo Component
function ChatLogicDemo() {
  const { t } = useTranslation();
  const [animationKey, setAnimationKey] = useState(0);
  const controls = useAnimation();

  // Restart animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
            {t('ai.demo.title.prefix')} <span className="text-purple-400">{t('ai.demo.title.highlight')}</span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t('ai.demo.description')}
          </p>
        </motion.div>

        {/* Demo Visualization */}
        <div className="relative h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait" key={animationKey}>
            {/* User Message - Left Side */}
            <motion.div
              className="absolute left-0 md:left-10"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Users className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="max-w-[200px] md:max-w-[280px] p-4 rounded-2xl rounded-tl-none bg-zinc-800 border border-zinc-700">
                  <p className="text-sm text-zinc-300">&quot;{t('ai.demo.user_msg')}&quot;</p>
                </div>
              </div>
            </motion.div>

            {/* Central AI Node */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {/* Pulsing rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                style={{ width: 120, height: 120, margin: -20 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-500/20"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.3,
                }}
                style={{ width: 120, height: 120, margin: -20 }}
              />

              {/* Core */}
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30"
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(168, 85, 247, 0.3)",
                    "0 0 60px rgba(168, 85, 247, 0.5)",
                    "0 0 30px rgba(168, 85, 247, 0.3)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>

              {/* Processing indicator */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 0.8, duration: 1.2 }}
              >
                <span className="text-xs font-mono text-purple-400">{t('ai.demo.processing')}</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="text-purple-400"
                >
                  ...
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Bot Response - Right Side */}
            <motion.div
              className="absolute right-0 md:right-10"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 2, duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="max-w-[200px] md:max-w-[280px] p-4 rounded-2xl rounded-tr-none bg-purple-900/30 border border-purple-500/30">
                  <p className="text-sm text-zinc-200">&quot;{t('ai.demo.bot_msg')}&quot;</p>
                  <motion.div
                    className="mt-2 flex items-center gap-1 text-xs text-purple-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    <Zap className="w-3 h-3" />
                    <span>{t('ai.demo.response_time')}</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <motion.line
              x1="25%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="url(#gradient-left)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
            <motion.line
              x1="50%"
              y1="50%"
              x2="75%"
              y2="50%"
              stroke="url(#gradient-right)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0, 1, 0.3] }}
              transition={{ delay: 1.8, duration: 0.8 }}
            />
            <defs>
              <linearGradient id="gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="gradient-right" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

// Capabilities Section
function CapabilitiesSection() {
  const { t } = useTranslation();
  const capabilities = [
    {
      icon: MessageSquare,
      title: t('ai.capabilities.support.title'),
      description: t('ai.capabilities.support.desc'),
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Users,
      title: t('ai.capabilities.lead.title'),
      description: t('ai.capabilities.lead.desc'),
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      icon: FileSearch,
      title: t('ai.capabilities.data.title'),
      description: t('ai.capabilities.data.desc'),
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
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
            {t('ai.capabilities.title.prefix')} <span className="text-purple-400">{t('ai.capabilities.title.highlight')}</span> {t('ai.capabilities.title.suffix')}
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto">
            {t('ai.capabilities.description')}
          </p>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              className={`relative p-8 rounded-2xl bg-zinc-900/50 border ${cap.borderColor} group hover:border-opacity-50 transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl ${cap.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-xl ${cap.bgColor} flex items-center justify-center mb-6`}>
                <cap.icon className={`w-7 h-7 ${cap.color}`} />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold text-white mb-3">{cap.title}</h3>
              <p className="relative text-zinc-400 leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Tech Stack
const techStack = [
  { name: "OpenAI", icon: "🧠" },
  { name: "Python", icon: "🐍" },
  { name: "LangChain", icon: "🔗" },
  { name: "Pinecone", icon: "🌲" },
  { name: "Vercel AI", icon: "▲" },
  { name: "FastAPI", icon: "⚡" },
];

// Tech Stack Marquee
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
        {/* Floating sparkles */}
        <motion.div
          className="inline-block mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-12 h-12 text-purple-400" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('ai.cta.title.prefix')}{" "}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t('ai.cta.title.highlight')}
          </span>
          {t('ai.cta.title.suffix')}
        </h2>
        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
          {t('ai.cta.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hire-us"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Bot className="w-5 h-5" />
            {t('ai.cta.button.deploy')}
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-xl border border-zinc-700 text-white font-semibold hover:bg-zinc-800 transition-colors"
          >
            {t('ai.cta.button.back')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// Main Page Component
export default function AIBotsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <HeroSection />
      <ChatLogicDemo />
      <CapabilitiesSection />
      <TechStackMarquee />
      <CTASection />
    </div>
  );
}

