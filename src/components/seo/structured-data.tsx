"use client";

import { structuredData } from "@/lib/seo";
import { SEOSafeWrapper } from "./error-boundary";

interface StructuredDataProps {
  type:
    | "organization"
    | "website"
    | "course"
    | "breadcrumb"
    | "faq"
    | "article";
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <SEOSafeWrapper>
      <StructuredDataContent type={type} data={data} />
    </SEOSafeWrapper>
  );
}

function StructuredDataContent({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    try {
      switch (type) {
        case "organization":
          return structuredData.organization;
        case "website":
          return structuredData.website;
        case "course":
          return structuredData.course;
        case "breadcrumb":
          return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: data?.items?.map((item: any, index: number) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: item.url,
            })),
          };
        case "faq":
          return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data?.questions?.map((q: any) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: q.answer,
              },
            })),
          };
        case "article":
          return {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: data?.title,
            description: data?.description,
            author: {
              "@type": "Organization",
              name: "Menteeno",
            },
            publisher: {
              "@type": "Organization",
              name: "Menteeno",
              logo: {
                "@type": "ImageObject",
                url: "https://menteeno.com/logo.png",
              },
            },
            datePublished: data?.publishedAt,
            dateModified: data?.modifiedAt,
            image: data?.image,
          };
        default:
          return null;
      }
    } catch (error) {
      console.warn("Error generating structured data:", error);
      return null;
    }
  };

  const structuredDataJson = getStructuredData();

  if (!structuredDataJson) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredDataJson, null, 2),
      }}
    />
  );
}
