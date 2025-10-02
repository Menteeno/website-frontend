"use client";

import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, HelpCircleIcon } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const HeroFAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: "what-is-menteeno",
      question: t("messages.hero-faq.questions.what-is-menteeno"),
      answer: t("messages.hero-faq.answers.what-is-menteeno"),
    },
    {
      id: "how-does-it-work",
      question: t("messages.hero-faq.questions.how-does-it-work"),
      answer: t("messages.hero-faq.answers.how-does-it-work"),
    },
    {
      id: "learning-path",
      question: t("messages.hero-faq.questions.learning-path"),
      answer: t("messages.hero-faq.answers.learning-path"),
    },
    {
      id: "schedule",
      question: t("messages.hero-faq.questions.schedule"),
      answer: t("messages.hero-faq.answers.schedule"),
    },
    {
      id: "start",
      question: t("messages.hero-faq.questions.start"),
      answer: t("messages.hero-faq.answers.start"),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircleIcon className="size-4" />
            {t("messages.hero-faq.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("messages.hero-faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("messages.hero-faq.description")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors duration-200"
              >
                <span className="font-semibold text-foreground text-base sm:text-lg pr-4">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    "size-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openItems.includes(item.id) && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openItems.includes(item.id)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            {t("messages.hero-faq.footer.question")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            {t("messages.hero-faq.footer.cta")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroFAQ;
