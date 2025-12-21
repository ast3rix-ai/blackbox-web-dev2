"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, FlaskConical, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Mini project data for homepage preview
const labProjects = [
    {
        id: "nexus",
        name: "NEXUS",
        taglineKey: "labs.nexus.tagline",
        color: "#00f5ff",
        colorClass: "from-cyan-500 to-cyan-400",
        textColor: "text-cyan-400",
    },
    {
        id: "kinetic",
        name: "KINETIC",
        taglineKey: "labs.kinetic.tagline",
        color: "#ec4899",
        colorClass: "from-pink-500 to-pink-400",
        textColor: "text-pink-400",
    },
    {
        id: "echo",
        name: "ECHO",
        taglineKey: "labs.echo.tagline",
        color: "#8b5cf6",
        colorClass: "from-violet-500 to-violet-400",
        textColor: "text-violet-400",
    },
];

// Mini project pill
function ProjectPill({ project }: { project: (typeof labProjects)[0] }) {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
        >
            <div
                className="relative px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/10"
            >
                {/* Background glow */}
                <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at center, ${project.color}10, transparent 70%)`,
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-4">
                    {/* Project indicator */}
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{
                            background: project.color,
                            boxShadow: `0 0 12px ${project.color}60`,
                        }}
                    />

                    {/* Text */}
                    <div className="flex-1">
                        <h4 className="text-white font-bold text-lg">{project.name}</h4>
                        <p className={`text-sm ${project.textColor} opacity-80`}>
                            {t(project.taglineKey as any)}
                        </p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        animate={{ x: isHovered ? 4 : 0, y: isHovered ? -4 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowUpRight className={`w-5 h-5 ${project.textColor}`} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function LabsShowcase() {
    const { t } = useTranslation();

    return (
        <section className="px-6 py-20 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-purple-500/30 bg-purple-500/5"
                        >
                            <FlaskConical className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-purple-400">{t('labs.badge')}</span>
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            <span className="text-white">{t('home.labs.title.prefix')} </span>
                            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                                {t('home.labs.title.highlight')}
                            </span>
                        </h2>
                        <p className="text-zinc-400 max-w-md">
                            {t('home.labs.description')}
                        </p>
                    </div>

                    {/* CTA Link */}
                    <Link
                        href="/labs"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-white font-medium hover:border-purple-500/50 transition-all duration-300"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>{t('home.labs.explore')}</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* Project Pills Grid */}
                <Link href="/labs">
                    <div className="grid md:grid-cols-3 gap-4">
                        {labProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <ProjectPill project={project} />
                            </motion.div>
                        ))}
                    </div>
                </Link>
            </motion.div>
        </section>
    );
}
