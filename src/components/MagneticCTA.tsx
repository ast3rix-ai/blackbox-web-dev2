"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Calendar, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

function MagneticLink({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Magnetic pull strength
    const pullStrength = 0.3;
    x.set((e.clientX - centerX) * pullStrength);
    y.set((e.clientY - centerY) * pullStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={cn(
          "relative group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 inline-block",
          className
        )}
      >
        {children}
      </motion.a>
    </Link>
  );
}

export default function MagneticCTA() {
  const { t } = useTranslation();
  return (
    <section className="px-6 pt-20 pb-10 max-w-7xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 p-12 md:p-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

        {/* Static decorative dots */}
        <div className="absolute w-1 h-1 rounded-full bg-cyan-400/30" style={{ left: "20%", top: "20%" }} />
        <div className="absolute w-1 h-1 rounded-full bg-cyan-400/20" style={{ left: "35%", top: "40%" }} />
        <div className="absolute w-1 h-1 rounded-full bg-purple-400/30" style={{ left: "80%", top: "30%" }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-neon-cyan/30 bg-neon-cyan/5"
          >
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan">{t('cta.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            {t('cta.title.prefix')}
            <br />
            <span className="text-gradient-shimmer">{t('cta.title.highlight')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400 mb-12 max-w-xl mx-auto"
          >
            {t('cta.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA - Magnetic */}
            <MagneticLink href="/hire-us" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t('cta.button.call')}
                <ArrowRight className="w-5 h-5" />
              </span>
            </MagneticLink>

            {/* Secondary CTA */}
            <MagneticLink href="/hire-us" className="bg-transparent border border-zinc-700 text-white hover:border-zinc-500 hover:bg-zinc-800/50">
              <span className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t('cta.button.email')}
              </span>
            </MagneticLink>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-zinc-500"
          >
            {[t('cta.trust.1'), t('cta.trust.2'), t('cta.trust.3')].map(
              (item, index) => (
                <span key={index}>{item}</span>
              )
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 py-6 text-center"
      >
        <div className="flex justify-center gap-6 mb-3">
          <a
            href="https://github.com/ast3rix-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/filip-ronaj-a5b2a924a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/vibecodexo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors text-sm"
          >
            Instagram
          </a>
        </div>
        <p className="text-zinc-500 text-sm italic mb-1">
          {t('cta.quote')}
        </p>
        <p className="text-zinc-600 text-xs">
          {t('cta.copyright')}
        </p>
      </motion.footer>
    </section>
  );
}

