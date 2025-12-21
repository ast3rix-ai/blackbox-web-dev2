"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, Bot, Palette, Sparkles, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

const navItems = [
  {
    label: "nav.home",
    href: "/",
    icon: Home,
  },
  {
    label: "nav.web_dev",
    href: "/services/web-development",
    icon: Code,
  },
  {
    label: "nav.ai_bots",
    href: "/services/ai-bots",
    icon: Bot,
  },
  {
    label: "nav.ui_ux",
    href: "/services/ui-ux-design",
    icon: Palette,
  },
  {
    label: "nav.labs",
    href: "/labs",
    icon: FlaskConical,
  },
];

export default function FloatingNav() {
  const { t, language, setLanguage } = useTranslation();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Smooth opacity animation
  const opacity = useMotionValue(1);
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });

  // Smooth Y position animation
  const y = useMotionValue(0);
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  // Only animate on first mount
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  // Track scroll direction for hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show at top of page
          if (currentScrollY < 50) {
            setIsVisible(true);
            opacity.set(1);
            y.set(0);
          }
          // Scrolling down - hide navbar
          else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
            opacity.set(0);
            y.set(-20);
          }
          // Scrolling up - show navbar
          else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
            opacity.set(1);
            y.set(0);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [opacity, y]);

  return (
    <>
      {/* Desktop Navigation - Centered */}
      <div className="fixed top-6 z-[5000] hidden md:flex justify-center w-full pointer-events-none">
        <motion.nav
          initial={hasAnimated ? false : { y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20 }}
          style={{
            opacity: smoothOpacity,
            y: smoothY,
          }}
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-full pointer-events-auto",
            "bg-black/70 backdrop-blur-md border border-white/10",
            "shadow-lg shadow-black/20",
            !isVisible && "pointer-events-none"
          )}
        >
          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {/* Active background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {t(item.label as any)}
                  </span>
                </motion.div>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'sk' : 'en')}
            className="px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors uppercase"
          >
            {language}
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* CTA Button */}
          <Link href="/hire-us">
            <motion.div
              className="relative px-5 py-2 rounded-full text-sm font-semibold overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-100" />
              <div className="absolute inset-[1px] rounded-full bg-black/90" />

              <span className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {t('nav.hire_us')}
              </span>
            </motion.div>
          </Link>
        </motion.nav>
      </div>

      {/* Mobile Bottom Bar - Centered */}
      <div className="fixed bottom-4 z-[5000] md:hidden flex justify-center w-full pointer-events-none">
        <motion.nav
          initial={hasAnimated ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: hasAnimated ? 0 : 0.2, type: "spring", stiffness: 100, damping: 20 }}
          style={{
            opacity: smoothOpacity,
          }}
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-full pointer-events-auto",
            "bg-black/80 backdrop-blur-md border border-white/10",
            "shadow-lg shadow-black/30",
            !isVisible && "pointer-events-none"
          )}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={cn(
                    "relative p-3 rounded-full transition-colors duration-200",
                    isActive ? "text-white" : "text-zinc-500"
                  )}
                  whileTap={{ scale: 0.9 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-active"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  <item.icon className="relative z-10 w-5 h-5" />
                </motion.div>
              </Link>
            );
          })}

          {/* CTA */}
          <Link href="/hire-us">
            <motion.div
              className="relative p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
              whileTap={{ scale: 0.9 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </Link>
        </motion.nav>
      </div>
    </>
  );
}
