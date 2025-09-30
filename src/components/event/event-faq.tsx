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

const EventFAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: "what-is-event",
      question: t("event.faq.questions.what-is-event"),
      answer: t("event.faq.answers.what-is-event"),
    },
    {
      id: "who-can-attend",
      question: t("event.faq.questions.who-can-attend"),
      answer: t("event.faq.answers.who-can-attend"),
    },
    {
      id: "what-to-bring",
      question: t("event.faq.questions.what-to-bring"),
      answer: t("event.faq.answers.what-to-bring"),
    },
    {
      id: "cancellation-policy",
      question: t("event.faq.questions.cancellation-policy"),
      answer: t("event.faq.answers.cancellation-policy"),
    },
    {
      id: "dress-code",
      question: t("event.faq.questions.dress-code"),
      answer: t("event.faq.answers.dress-code"),
    },
    {
      id: "parking",
      question: t("event.faq.questions.parking"),
      answer: t("event.faq.answers.parking"),
    },
    {
      id: "food-beverages",
      question: t("event.faq.questions.food-beverages"),
      answer: t("event.faq.answers.food-beverages"),
    },
    {
      id: "certificate",
      question: t("event.faq.questions.certificate"),
      answer: t("event.faq.answers.certificate"),
    },
    {
      id: "contact-info",
      question: t("event.faq.questions.contact-info"),
      answer: t("event.faq.answers.contact-info"),
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <HelpCircleIcon className="size-4" />
            {t("event.faq.badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("event.faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("event.faq.description")}
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
            {t("event.faq.footer.question")}
          </p>
          <a
            href="mailto:event@menteeno.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            {t("event.faq.footer.cta")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventFAQ;
