"use client";

import { structuredData } from "@/lib/seo";
import { StructuredData } from "./structured-data";

interface PersianSEOProps {
  locale: string;
  children?: React.ReactNode;
}

export function PersianSEO({ locale, children }: PersianSEOProps) {
  const isPersian = locale === "fa";

  if (!isPersian) return <>{children}</>;

  return (
    <>
      {/* Persian-specific structured data */}
      <StructuredData
        type="organization"
        data={structuredData.persian.organization}
      />
      <StructuredData type="course" data={structuredData.persian.course} />
      <StructuredData type="faq" data={structuredData.persian.faq} />

      {/* Persian-specific meta tags */}
      <meta name="language" content="fa" />
      <meta name="content-language" content="fa-IR" />
      <meta name="geo.region" content="IR" />
      <meta name="geo.country" content="Iran" />
      <meta name="DC.language" content="fa" />
      <meta name="DC.language.iso" content="fa-IR" />

      {/* Persian-specific Open Graph */}
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Persian-specific Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@menteeno" />
      <meta name="twitter:creator" content="@menteeno" />

      {/* Persian-specific canonical and alternate links */}
      <link rel="canonical" href="https://menteeno.app/fa" />
      <link rel="alternate" hrefLang="fa" href="https://menteeno.app/fa" />
      <link rel="alternate" hrefLang="en" href="https://menteeno.app/en" />
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://menteeno.app/fa"
      />

      {/* Persian-specific search engines */}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="yandexbot" content="index, follow" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      {/* Persian-specific verification tags */}
      <meta
        name="google-site-verification"
        content="your-google-verification-code"
      />
      <meta
        name="yandex-verification"
        content="your-yandex-verification-code"
      />

      {children}
    </>
  );
}

// Persian-specific FAQ structured data
export function PersianFAQStructuredData() {
  const persianFAQData = {
    questions: [
      {
        question: "منتینو چیست؟",
        answer:
          "منتینو پلتفرمی برای توسعه مهارت‌های حرفه‌ای است که منتورشیپ شخصی‌سازی‌شده، آموزش عملی و راهنمایی متخصصان را ارائه می‌دهد تا به حرفه‌ای‌ها کمک کند تا شغل خود را رشد دهند و مهارت‌های نرم خود را ارتقا دهند.",
      },
      {
        question: "برنامه منتورشیپ منتینو چگونه کار می‌کند؟",
        answer:
          "برنامه منتورشیپ ما شما را با متخصصان باتجربه متصل می‌کند که از طریق سه جلسه منتورشیپ خصوصی، راهنمایی شخصی‌سازی‌شده ارائه می‌دهند و به شما کمک می‌کنند تا مهارت‌های خاص را توسعه دهید و شغل خود را پیشرفت دهید.",
      },
      {
        question: "چه نوع مهارت‌هایی می‌توانم در منتینو توسعه دهم؟",
        answer:
          "منتینو بر توسعه مهارت‌های نرم از جمله رهبری، کار تیمی، ارتباطات، شبکه‌سازی، حل مسئله و سایر شایستگی‌های ضروری محیط کار که موفقیت حرفه‌ای را به همراه دارد، تمرکز دارد.",
      },
      {
        question: "آیا منتینو برای مبتدیان مناسب است؟",
        answer:
          "بله، منتینو برای حرفه‌ای‌ها در تمام سطوح، از مبتدی تا پیشرفته طراحی شده است. مسیرهای یادگیری شخصی‌سازی‌شده ما با سطح مهارت فعلی و اهداف شغلی شما سازگار می‌شود.",
      },
      {
        question: "برنامه چقدر طول می‌کشد تا تکمیل شود؟",
        answer:
          "مدت زمان برنامه بر اساس مسیر یادگیری شخصی‌سازی‌شده و اهداف شما متفاوت است. اکثر شرکت‌کنندگان پس از ۳ تا ۶ ماه تعامل مداوم با پلتفرم، بهبود قابل توجهی مشاهده می‌کنند.",
      },
      {
        question: "چه چیزی منتینو را از سایر پلتفرم‌های یادگیری متمایز می‌کند؟",
        answer:
          "منتینو منتورشیپ شخصی‌سازی‌شده را با تمرین دنیای واقعی، بازخورد متخصصان و جامعه حمایت‌کننده ترکیب می‌کند. ما بر کاربرد عملی به جای فقط دانش نظری تمرکز داریم.",
      },
      {
        question: "آیا می‌توانم مهارت‌ها را در محیطی امن تمرین کنم؟",
        answer:
          "حتماً! منتینو محیط شبیه‌سازی‌شده‌ای فراهم می‌کند که در آن می‌توانید مهارت‌های کار تیمی، رهبری و شبکه‌سازی را بدون عواقب دنیای واقعی تمرین کنید و از اشتباهات خود به صورت امن یاد بگیرید.",
      },
      {
        question: "چگونه پیشرفت خود را پیگیری کنم؟",
        answer:
          "پلتفرم ما شامل ارزیابی‌های سفارشی و ابزارهای پیگیری پیشرفت است که توسعه مهارت‌های شما را در طول زمان اندازه‌گیری می‌کند و بینش‌های واضحی از رشد و زمینه‌های بهبود ارائه می‌دهد.",
      },
    ],
  };

  return <StructuredData type="faq" data={persianFAQData} />;
}
