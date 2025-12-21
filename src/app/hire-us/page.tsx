"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Calendar,
  ArrowRight,
  Linkedin,
  Github,
  Instagram,
  Zap,
  Rocket,
  Send,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Data Rain Background
function DataRainBackground() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Generate random column positions
    const cols = Array.from({ length: 30 }, () => Math.random() * 100);
    setColumns(cols);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950" />

      {/* Data rain columns */}
      {columns.map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px"
          style={{ left: `${left}%` }}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: ["0%", "30%", "0%"],
            opacity: [0, 0.3, 0],
            y: ["-10%", "110%"],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />
        </motion.div>
      ))}

      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
    </div>
  );
}

// Mission type options
const missionTypes = [
  { id: "web-dev", labelKey: "hire.mission.web", icon: "🌐" },
  { id: "ai-bot", labelKey: "hire.mission.bot", icon: "🤖" },
  { id: "mobile-app", labelKey: "hire.mission.app", icon: "📱" },
  { id: "ui-ux", labelKey: "hire.mission.ui", icon: "🎨" },
  { id: "full-system", labelKey: "hire.mission.system", icon: "⚡" },
];

// Budget ranges
const budgetRanges = [
  { id: "starter", label: "$5K - $10K", value: "5k-10k" },
  { id: "growth", label: "$10K - $25K", value: "10k-25k" },
  { id: "scale", label: "$25K - $50K", value: "25k-50k" },
  { id: "enterprise", label: "$50K+", value: "50k+" },
];

// Social links
const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/filip-ronaj-a5b2a924a", color: "hover:text-blue-400" },
  { name: "GitHub", icon: Github, href: "https://github.com/ast3rix-ai", color: "hover:text-white" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/vibecodexo/", color: "hover:text-pink-400" },
];

// Magnetic Button Component
function MagneticButton({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 transition-colors ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// Copy Email Component
function CopyableEmail() {
  const [copied, setCopied] = useState(false);
  const email = "project@blckbox.studio";
  const { t } = useTranslation();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={handleCopy}
      className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 hover:border-cyan-500/50 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-1 text-left">
        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{t('hire.email_label')}</p>
        <p className="text-xl md:text-2xl font-mono text-white group-hover:text-cyan-400 transition-colors">
          {email}
        </p>
      </div>

      <div className="relative w-10 h-10 rounded-lg bg-zinc-700/50 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-5 h-5 text-cyan-400" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Copy className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Copied tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-medium"
          >
            Copied!
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-500 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Form submission states
type FormState = "idle" | "submitting" | "success" | "error";

export default function HireUsPage() {
  const { t } = useTranslation();
  // Form state
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMissions, setSelectedMissions] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [brief, setBrief] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [progress, setProgress] = useState(0);

  const toggleMission = (id: string) => {
    setSelectedMissions((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setProgress(0);

    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Send to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          missions: selectedMissions,
          budget,
          brief,
        }),
      });

      clearInterval(interval);

      if (response.ok) {
        setProgress(100);
        setFormState("success");

        // Reset form after success
        setTimeout(() => {
          setFormState("idle");
          setProgress(0);
          setName("");
          setCompany("");
          setEmail("");
          setSelectedMissions([]);
          setBudget("");
          setBrief("");
        }, 3000);
      } else {
        setFormState("error");
        setTimeout(() => {
          setFormState("idle");
          setProgress(0);
        }, 3000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      clearInterval(interval);
      setFormState("error");
      setTimeout(() => {
        setFormState("idle");
        setProgress(0);
      }, 3000);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300";

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      <DataRainBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 py-20">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{t('hire.back_base')}</span>
          </Link>
        </motion.div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - The Direct Line */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400">{t('hire.badge')}</span>
            </motion.div>

            {/* Headline */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                <span className="text-white">{t('hire.title.prefix')}</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t('hire.title.highlight')}
                </span>
              </h1>
              <p className="text-lg text-zinc-400 max-w-md">
                {t('hire.description')}
              </p>
            </div>

            {/* Email Display */}
            <CopyableEmail />

            {/* Social Connections */}
            <div>
              <p className="text-sm text-zinc-500 mb-4">{t('hire.connect')}</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <MagneticButton
                    key={social.name}
                    href={social.href}
                    className={social.color}
                  >
                    <social.icon className="w-5 h-5" />
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Book a Call Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-zinc-800"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{t('hire.call.title')}</h3>
                  <p className="text-sm text-zinc-400 mb-4">
                    {t('hire.call.desc')}
                  </p>
                  <a
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/YOUR_USERNAME/discovery"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300 transition-all duration-300 text-sm font-medium"
                  >
                    <Calendar className="w-4 h-4" />
                    {t('hire.call.button')}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - The Mission Parameters Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 shadow-2xl shadow-black/50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{t('hire.form.title')}</h2>
                  <p className="text-sm text-zinc-500">{t('hire.form.subtitle')}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Identity Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">{t('hire.form.name')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">{t('hire.form.company')}</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Coordinates (Email) */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">{t('hire.form.email')}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@acme.com"
                    className={inputClasses}
                    required
                  />
                </div>

                {/* Mission Type */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">{t('hire.form.mission_type')}</label>
                  <div className="flex flex-wrap gap-2">
                    {missionTypes.map((mission) => (
                      <motion.button
                        key={mission.id}
                        type="button"
                        onClick={() => toggleMission(mission.id)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 ${selectedMissions.includes(mission.id)
                          ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20"
                          : "bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:border-zinc-600"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-2">{mission.icon}</span>
                        {t(mission.labelKey as any)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-3">{t('hire.form.budget')}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetRanges.map((range) => (
                      <motion.button
                        key={range.id}
                        type="button"
                        onClick={() => setBudget(range.value)}
                        className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${budget === range.value
                          ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                          : "bg-zinc-800/50 border-zinc-700/50 text-zinc-400 hover:border-zinc-600"
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {range.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Brief */}
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">{t('hire.form.brief')}</label>
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder={t('hire.form.brief_placeholder')}
                    rows={4}
                    className={`${inputClasses} resize-none`}
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formState === "submitting" || formState === "success" || formState === "error"}
                  className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden disabled:cursor-not-allowed"
                  whileHover={formState === "idle" ? { scale: 1.02 } : {}}
                  whileTap={formState === "idle" ? { scale: 0.98 } : {}}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500" />

                  {/* Progress bar overlay */}
                  {formState === "submitting" && (
                    <motion.div
                      className="absolute inset-0 bg-zinc-900/80"
                      initial={{ x: "0%" }}
                      animate={{ x: `${100 - progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  )}

                  {/* Success overlay */}
                  {formState === "success" && (
                    <motion.div
                      className="absolute inset-0 bg-emerald-500"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Error overlay */}
                  {formState === "error" && (
                    <motion.div
                      className="absolute inset-0 bg-red-500"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <AnimatePresence mode="wait">
                      {formState === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          {t('hire.form.submit')}
                        </motion.span>
                      )}
                      {formState === "submitting" && (
                        <motion.span
                          key="submitting"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          {t('hire.form.submitting')} {progress}%
                        </motion.span>
                      )}
                      {formState === "success" && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <Check className="w-5 h-5" />
                          {t('hire.form.success')}
                        </motion.span>
                      )}
                      {formState === "error" && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <AlertCircle className="w-5 h-5" />
                          {t('hire.form.error')}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>

                {/* Privacy note */}
                <p className="text-xs text-zinc-500 text-center">
                  {t('hire.form.privacy')}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
