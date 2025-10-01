"use client";

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { useTranslation } from "@/hooks/use-translation";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  return <PrivacyContent params={params} />;
}

function PrivacyContent({ params }: { params: Promise<{ locale: string }> }) {
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
                {t("privacy.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("privacy.last_updated")}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.introduction.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.introduction.content")}
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.information_collection.title")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t(
                          "privacy.information_collection.personal_info.title"
                        )}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {t(
                          "privacy.information_collection.personal_info.content"
                        )}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>
                          {t(
                            "privacy.information_collection.personal_info.items.name"
                          )}
                        </li>
                        <li>
                          {t(
                            "privacy.information_collection.personal_info.items.email"
                          )}
                        </li>
                        <li>
                          {t(
                            "privacy.information_collection.personal_info.items.phone"
                          )}
                        </li>
                        <li>
                          {t(
                            "privacy.information_collection.personal_info.items.profile"
                          )}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("privacy.information_collection.usage_data.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {t("privacy.information_collection.usage_data.content")}
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>
                          {t(
                            "privacy.information_collection.usage_data.items.device"
                          )}
                        </li>
                        <li>
                          {t(
                            "privacy.information_collection.usage_data.items.browser"
                          )}
                        </li>
                        <li>
                          {t(
                            "privacy.information_collection.usage_data.items.ip"
                          )}
                        </li>
                        <li>
                          {t(
                            "privacy.information_collection.usage_data.items.activity"
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.usage.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("privacy.usage.content")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>{t("privacy.usage.items.service")}</li>
                    <li>{t("privacy.usage.items.communication")}</li>
                    <li>{t("privacy.usage.items.personalization")}</li>
                    <li>{t("privacy.usage.items.improvement")}</li>
                    <li>{t("privacy.usage.items.legal")}</li>
                  </ul>
                </section>

                {/* Data Sharing */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.sharing.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("privacy.sharing.content")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>{t("privacy.sharing.items.service_providers")}</li>
                    <li>{t("privacy.sharing.items.legal_requirements")}</li>
                    <li>{t("privacy.sharing.items.business_transfer")}</li>
                    <li>{t("privacy.sharing.items.consent")}</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.security.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.security.content")}
                  </p>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.rights.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("privacy.rights.content")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>{t("privacy.rights.items.access")}</li>
                    <li>{t("privacy.rights.items.correction")}</li>
                    <li>{t("privacy.rights.items.deletion")}</li>
                    <li>{t("privacy.rights.items.portability")}</li>
                    <li>{t("privacy.rights.items.objection")}</li>
                  </ul>
                </section>

                {/* Cookies */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.cookies.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.cookies.content")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    <a
                      href={`/${locale}/cookies`}
                      className="text-primary hover:text-primary/80 underline"
                    >
                      {t("footer.legal.cookies")}
                    </a>
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.third_party.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.third_party.content")}
                  </p>
                </section>

                {/* Children's Privacy */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.children.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.children.content")}
                  </p>
                </section>

                {/* Changes to Privacy Policy */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.changes.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("privacy.changes.content")}
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("privacy.contact.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("privacy.contact.content")}
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground font-medium mb-2">
                      {t("privacy.contact.email_label")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("privacy.contact.email")}
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
