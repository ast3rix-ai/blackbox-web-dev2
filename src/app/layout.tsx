import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import FloatingNav from "@/components/FloatingNav";
import PageTransition from "@/components/PageTransition";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://blckbox.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BLACKBOX | Digital Agency - Web Development, AI Bots & UI/UX Design",
    template: "%s | BLACKBOX Digital Agency",
  },
  description:
    "BLACKBOX is a premium digital agency specializing in high-performance web development, AI chatbots, and modern UI/UX design. We transform complex problems into elegant, scalable solutions that convert visitors into customers.",
  keywords: [
    "BLACKBOX",
    "digital agency",
    "web development",
    "web design",
    "Next.js development",
    "React development",
    "AI chatbots",
    "custom chatbots",
    "UI/UX design",
    "web applications",
    "software development",
    "TypeScript",
    "full-stack development",
    "modern web design",
    "responsive design",
    "conversion optimization",
  ],
  authors: [{ name: "BLACKBOX Digital Agency", url: siteUrl }],
  creator: "BLACKBOX",
  publisher: "BLACKBOX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "BLACKBOX Digital Agency",
    title: "BLACKBOX | Digital Agency - Web Development, AI Bots & UI/UX Design",
    description:
      "Premium digital agency specializing in high-performance web development, AI chatbots, and modern UI/UX design. Transform your vision into digital reality.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BLACKBOX Digital Agency - Building Digital Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACKBOX | Digital Agency - Web Development, AI Bots & UI/UX Design",
    description:
      "Premium digital agency specializing in high-performance web development, AI chatbots, and modern UI/UX design.",
    images: ["/og-image.png"],
    creator: "@blackbox",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BLACKBOX Digital Agency",
  description:
    "Premium digital agency specializing in high-performance web development, AI chatbots, and modern UI/UX design.",
  url: "https://blckbox.studio",
  logo: "https://blckbox.studio/logo.png",
  email: "project@blckbox.studio",
  sameAs: [
    "https://github.com/ast3rix-ai",
    "https://www.linkedin.com/in/filip-ronaj-a5b2a924a",
    "https://www.instagram.com/vibecodexo/",
  ],
  services: [
    {
      "@type": "Service",
      name: "Web Development",
      description: "High-performance Next.js and React web applications",
    },
    {
      "@type": "Service",
      name: "AI Chatbots",
      description: "Custom AI-powered chatbots and automation solutions",
    },
    {
      "@type": "Service",
      name: "UI/UX Design",
      description: "Modern, conversion-focused interface design",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Force scroll to top on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.history.scrollRestoration = 'manual';
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LanguageProvider>
          {/* Background Gradient Mesh */}
          <div className="gradient-mesh" aria-hidden="true" />

          {/* Noise Texture Overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Floating Navigation */}
          <FloatingNav />

          {/* Main Content with Page Transitions */}
          <main className="relative z-10 overflow-x-hidden">
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          {/* Vercel Analytics */}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
