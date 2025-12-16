import { type ReactNode } from "react";
import { type Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, Space_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anton Zakharov",
  url: "https://toxuh.pro",
  email: "me@toxuh.pro",
  jobTitle: "Frontend Developer",
  description:
    "Frontend developer specializing in React, Next.js, and TypeScript. Building performant, accessible, and scalable web applications.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zaragoza",
    addressCountry: "Spain",
  },
  sameAs: ["https://github.com/toxuh", "https://linkedin.com/in/toxuh"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "Web Development",
    "Tailwind CSS",
    "Node.js",
  ],
};

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Anton Zakharov — Frontend Developer",
  description:
    "Frontend developer specializing in React, Next.js, and TypeScript. Building performant, accessible, and scalable web applications.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Anton Zakharov",
    "UI Development",
    "JavaScript",
  ],
  authors: [{ name: "Anton Zakharov", url: "https://toxuh.pro" }],
  creator: "Anton Zakharov",
  publisher: "Anton Zakharov",
  metadataBase: new URL("https://toxuh.pro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://toxuh.pro",
    siteName: "Anton Zakharov",
    title: "Anton Zakharov — Frontend Developer",
    description:
      "Frontend developer specializing in React, Next.js, and TypeScript. Building performant, accessible, and scalable web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anton Zakharov — Frontend Developer",
    description:
      "Frontend developer specializing in React, Next.js, and TypeScript. Building performant, accessible, and scalable web applications.",
    creator: "@toxuh",
  },
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
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Anton Zakharov",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body
      className={`${instrumentSerif.variable} ${spaceMono.variable} antialiased`}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
