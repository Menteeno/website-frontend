"use client";

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { useTranslation } from "@/hooks/use-translation";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export default function CookiesPage({ params }: CookiesPageProps) {
  return <CookiesContent params={params} />;
}

function CookiesContent({ params }: { params: Promise<{ locale: string }> }) {
  const { t, locale } = useTranslation();

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("cookies.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("cookies.last_updated")}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.introduction.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("cookies.introduction.content")}
                  </p>
                </section>

                {/* What Are Cookies */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.what_are_cookies.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("cookies.what_are_cookies.content")}
                  </p>
                </section>

                {/* Types of Cookies */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.types.title")}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-3">
                        {t("cookies.types.essential.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {t("cookies.types.essential.content")}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>
                          {t("cookies.types.essential.items.authentication")}
                        </li>
                        <li>{t("cookies.types.essential.items.security")}</li>
                        <li>
                          {t("cookies.types.essential.items.preferences")}
                        </li>
                        <li>
                          {t("cookies.types.essential.items.functionality")}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-3">
                        {t("cookies.types.analytics.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {t("cookies.types.analytics.content")}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>{t("cookies.types.analytics.items.usage")}</li>
                        <li>
                          {t("cookies.types.analytics.items.performance")}
                        </li>
                        <li>
                          {t("cookies.types.analytics.items.improvements")}
                        </li>
                        <li>{t("cookies.types.analytics.items.anonymized")}</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-3">
                        {t("cookies.types.marketing.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {t("cookies.types.marketing.content")}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>
                          {t("cookies.types.marketing.items.advertising")}
                        </li>
                        <li>{t("cookies.types.marketing.items.targeting")}</li>
                        <li>{t("cookies.types.marketing.items.tracking")}</li>
                        <li>
                          {t("cookies.types.marketing.items.personalization")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Cookies We Use */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.we_use.title")}
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.we_use.session_cookies.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {t("cookies.we_use.session_cookies.description")}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <strong>
                          {t("cookies.we_use.session_cookies.duration")}
                        </strong>
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.we_use.preference_cookies.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {t("cookies.we_use.preference_cookies.description")}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <strong>
                          {t("cookies.we_use.preference_cookies.duration")}
                        </strong>
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.we_use.analytics_cookies.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {t("cookies.we_use.analytics_cookies.description")}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        <strong>
                          {t("cookies.we_use.analytics_cookies.duration")}
                        </strong>
                      </p>
                    </div>
                  </div>
                </section>

                {/* Third-Party Cookies */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.third_party.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("cookies.third_party.content")}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.third_party.google_analytics.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t("cookies.third_party.google_analytics.content")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.third_party.social_media.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t("cookies.third_party.social_media.content")}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Managing Cookies */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.managing.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("cookies.managing.content")}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.managing.browser_settings.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {t("cookies.managing.browser_settings.content")}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4 text-sm">
                        <li>{t("cookies.managing.browser_settings.chrome")}</li>
                        <li>
                          {t("cookies.managing.browser_settings.firefox")}
                        </li>
                        <li>{t("cookies.managing.browser_settings.safari")}</li>
                        <li>{t("cookies.managing.browser_settings.edge")}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {t("cookies.managing.our_preferences.title")}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t("cookies.managing.our_preferences.content")}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Impact of Disabling */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.impact.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("cookies.impact.content")}
                  </p>
                </section>

                {/* Updates to Policy */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.updates.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("cookies.updates.content")}
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("cookies.contact.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("cookies.contact.content")}
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground font-medium mb-2">
                      {t("cookies.contact.email_label")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("cookies.contact.email")}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
