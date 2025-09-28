"use client";

import Head from "next/head";
import { SEOConfig } from "@/lib/seo";

interface SEOHeadProps {
  config: SEOConfig;
  children?: React.ReactNode;
}

export function SEOHead({ config, children }: SEOHeadProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords.join(", ")} />
      <meta name="author" content={config.author} />
      <meta name="robots" content={`${config.robots?.index ? "index" : "noindex"}, ${config.robots?.follow ? "follow" : "nofollow"}`} />
      <meta name="language" content={config.locale} />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={config.canonical} />
      
      {/* Alternate Language Versions */}
      {config.alternates?.languages && Object.entries(config.alternates.languages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      
      {/* Open Graph Meta Tags */}
      {config.openGraph && (
        <>
          <meta property="og:type" content={config.openGraph.type} />
          <meta property="og:title" content={config.openGraph.title} />
          <meta property="og:description" content={config.openGraph.description} />
          <meta property="og:url" content={config.openGraph.url} />
          <meta property="og:site_name" content={config.openGraph.siteName} />
          <meta property="og:locale" content={config.openGraph.locale} />
          {config.openGraph.images?.map((image, index) => (
            <meta key={index} property="og:image" content={image.url} />
          ))}
          {config.openGraph.images?.[0] && (
            <>
              <meta property="og:image:width" content={config.openGraph.images[0].width.toString()} />
              <meta property="og:image:height" content={config.openGraph.images[0].height.toString()} />
              <meta property="og:image:alt" content={config.openGraph.images[0].alt} />
            </>
          )}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      {config.twitter && (
        <>
          <meta name="twitter:card" content={config.twitter.card} />
          <meta name="twitter:site" content={config.twitter.site} />
          <meta name="twitter:creator" content={config.twitter.creator} />
          <meta name="twitter:title" content={config.twitter.title} />
          <meta name="twitter:description" content={config.twitter.description} />
          {config.twitter.images?.map((image, index) => (
            <meta key={index} name="twitter:image" content={image} />
          ))}
        </>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content={config.themeColor} />
      <meta name="msapplication-TileColor" content={config.themeColor} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={config.title} />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Verification Tags */}
      {config.verification?.google && (
        <meta name="google-site-verification" content={config.verification.google} />
      )}
      {config.verification?.yandex && (
        <meta name="yandex-verification" content={config.verification.yandex} />
      )}
      {config.verification?.yahoo && (
        <meta name="msvalidate.01" content={config.verification.yahoo} />
      )}
      
      {/* Additional Children */}
      {children}
    </Head>
  );
}
