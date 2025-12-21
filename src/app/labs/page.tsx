"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    FlaskConical,
    Sparkles,
    Lock,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Project data for the R&D Vault
const projects = [
    {
        id: "nexus",
        name: "NEXUS",
        taglineKey: "labs.nexus.tagline",
        descriptionKey: "labs.nexus.desc",
        tech: ["Next.js", "Recharts", "Framer Motion"],
        link: "/nexus",
        color: "#00f5ff", // Cyan
        colorClass: "from-cyan-500 to-cyan-400",
        borderColor: "border-cyan-500/30",
        textColor: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
        status: "live",
    },
    {
        id: "kinetic",
        name: "KINETIC",
        taglineKey: "labs.kinetic.tagline",
        descriptionKey: "labs.kinetic.desc",
        tech: ["R3F", "WebGL", "Drei"],
        link: "/kinetic",
        color: "#ec4899", // Pink
        colorClass: "from-pink-500 to-pink-400",
        borderColor: "border-pink-500/30",
        textColor: "text-pink-400",
        bgColor: "bg-pink-500/10",
        status: "live",
    },
    {
        id: "echo",
        name: "ECHO",
        taglineKey: "labs.echo.tagline",
        descriptionKey: "labs.echo.desc",
        tech: ["GSAP", "Lenis"],
        link: "#",
        color: "#8b5cf6", // Violet
        colorClass: "from-violet-500 to-violet-400",
        borderColor: "border-violet-500/30",
        textColor: "text-violet-400",
        bgColor: "bg-violet-500/10",
        status: "coming-soon",
    },
];

// Glitch effect component for the title
function GlitchTitle({ children }: { children: React.ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.h1
            className="relative text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10 text-white">{children}</span>

            {/* Glitch layers */}
            {isHovered && (
                <>
                    <motion.span
                        className="absolute inset-0 text-cyan-400 opacity-70"
                        animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        style={{ clipPath: "inset(0 0 50% 0)" }}
                    >
                        {children}
                    </motion.span>
                    <motion.span
                        className="absolute inset-0 text-pink-400 opacity-70"
                        animate={{ x: [2, -2, 2], y: [-1, 1, -1] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        style={{ clipPath: "inset(50% 0 0 0)" }}
                    >
                        {children}
                    </motion.span>
                </>
            )}
        </motion.h1>
    );
}

// Project card component
function ProjectCard({
    project,
    index,
}: {
    project: (typeof projects)[0];
    index: number;
}) {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const isComingSoon = project.status === "coming-soon";

    const cardContent = (
        <>
            {/* Thumbnail container - 16:9 aspect ratio */}
            <div className="relative aspect-video overflow-hidden">
                {/* 
                    TODO: Replace this gradient with actual screenshot
                    Use: <Image src="/labs/nexus-preview.png" alt={project.name} fill className="object-cover" />
                */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.colorClass} opacity-20`}
                />

                {/* Project logo/name overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        className={`text-4xl font-black tracking-wider ${project.textColor}`}
                        style={{
                            textShadow: `0 0 40px ${project.color}40`,
                        }}
                        animate={isHovered && !isComingSoon ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {project.name}
                    </motion.span>
                </div>

                {/* Scan lines effect */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        background:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                    }}
                />

                {/* Hover overlay */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered && !isComingSoon ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20">
                        <Sparkles className="w-4 h-4 text-white" />
                        <span className="text-white font-medium text-sm">
                            {t('labs.launch')}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                </motion.div>

                {/* Coming Soon overlay */}
                {isComingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700">
                            <Lock className="w-4 h-4 text-zinc-400" />
                            <span className="text-zinc-400 font-medium text-sm">
                                {t('labs.coming_soon')}
                            </span>
                        </div>
                    </div>
                )}

                {/* Corner glow effect */}
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: project.color }}
                />
            </div>

            {/* Card details */}
            <div className="p-6">
                {/* Title and tagline */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                            {project.name}
                        </h3>
                        {!isComingSoon && (
                            <ArrowUpRight
                                className={`w-5 h-5 ${project.textColor} opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
                            />
                        )}
                    </div>
                    <p className={`text-sm ${project.textColor}`}>{t(project.taglineKey as any)}</p>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {t(project.descriptionKey as any)}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${project.borderColor} ${project.bgColor} ${project.textColor}`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom border glow on hover */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{
                    opacity: isHovered && !isComingSoon ? 1 : 0,
                    scaleX: isHovered && !isComingSoon ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />
        </>
    );

    const cardClasses = `group block relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/5 transition-all duration-500 ${isComingSoon ? "cursor-not-allowed" : "cursor-pointer hover:border-white/10"
        }`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            {isComingSoon ? (
                <div
                    className={cardClasses}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {cardContent}
                </div>
            ) : (
                <Link
                    href={project.link}
                    className={cardClasses}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {cardContent}
                </Link>
            )}
        </motion.div>
    );
}

// Main Labs page
export default function LabsPage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header Section */}
            <section className="relative px-6 py-20">
                {/* Background effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto">
                    {/* Back link */}
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
                            <span className="text-sm">{t('labs.back')}</span>
                        </Link>
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/5"
                    >
                        <FlaskConical className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400">{t('labs.badge')}</span>
                    </motion.div>

                    {/* Title with glitch effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6"
                    >
                        <GlitchTitle>{t('labs.title')}</GlitchTitle>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg text-zinc-400 max-w-xl"
                    >
                        {t('labs.description')}
                    </motion.p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 pb-32">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="px-6 pb-20"
            >
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-zinc-500 mb-6">
                        {t('labs.cta')}
                    </p>
                    <Link
                        href="/hire-us"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                        <span>{t('labs.cta_button')}</span>
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </motion.section>
        </div>
    );
}
