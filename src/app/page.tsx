import { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import BentoGrid from "@/components/BentoGrid";
import LabsShowcase from "@/components/LabsShowcase";
import BotShowcase from "@/components/BotShowcase";
import MagneticCTA from "@/components/MagneticCTA";

export const metadata: Metadata = {
  title: "BLACKBOX | Digital Agency - Web Development, AI Bots & UI/UX Design",
  description:
    "Transform your digital vision into reality with BLACKBOX. We specialize in high-performance web development, custom AI chatbots, and modern UI/UX design that converts visitors into customers.",
  alternates: {
    canonical: "https://blckbox.studio",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGrid />
      <LabsShowcase />
      <BotShowcase />
      <MagneticCTA />
    </div>
  );
}
