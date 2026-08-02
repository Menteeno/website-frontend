"use client";

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import { useTranslation } from "@/hooks/use-translation";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default function TermsPage({ params }: TermsPageProps) {
  return <TermsContent params={params} />;
}

function TermsContent({ params }: { params: Promise<{ locale: string }> }) {
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
                {t("terms.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("terms.last_updated")}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.introduction.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.introduction.content")}
                  </p>
                </section>

                {/* Acceptance of Terms */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.acceptance.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.acceptance.content")}
                  </p>
                </section>

                {/* Description of Service */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.service_description.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("terms.service_description.content")}
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>{t("terms.service_description.features.event_management")}</li>
                    <li>{t("terms.service_description.features.user_registration")}</li>
                    <li>{t("terms.service_description.features.communication")}</li>
                    <li>{t("terms.service_description.features.content_sharing")}</li>
                  </ul>
                </section>

                {/* User Accounts */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.user_accounts.title")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("terms.user_accounts.registration.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("terms.user_accounts.registration.content")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("terms.user_accounts.responsibility.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("terms.user_accounts.responsibility.content")}
                      </p>
                    </div>
                  </div>
                </section>

                {/* User Conduct */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.user_conduct.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("terms.user_conduct.content")}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("terms.user_conduct.prohibited.title")}
                      </h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>{t("terms.user_conduct.prohibited.items.illegal")}</li>
                        <li>{t("terms.user_conduct.prohibited.items.harmful")}</li>
                        <li>{t("terms.user_conduct.prohibited.items.spam")}</li>
                        <li>{t("terms.user_conduct.prohibited.items.unauthorized")}</li>
                        <li>{t("terms.user_conduct.prohibited.items.impersonation")}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("terms.user_conduct.required.title")}
                      </h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>{t("terms.user_conduct.required.items.respectful")}</li>
                        <li>{t("terms.user_conduct.required.items.accurate")}</li>
                        <li>{t("terms.user_conduct.required.items.compliant")}</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Intellectual Property */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.intellectual_property.title")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("terms.intellectual_property.our_content.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("terms.intellectual_property.our_content.content")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {t("terms.intellectual_property.user_content.title")}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("terms.intellectual_property.user_content.content")}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Privacy and Data Protection */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.privacy.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.privacy.content")}
                  </p>
                </section>

                {/* Service Availability */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.service_availability.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.service_availability.content")}
                  </p>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.liability.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.liability.content")}
                  </p>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.termination.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.termination.content")}
                  </p>
                </section>

                {/* Changes to Terms */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.changes.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.changes.content")}
                  </p>
                </section>

                {/* Governing Law */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.governing_law.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("terms.governing_law.content")}
                  </p>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    {t("terms.contact.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("terms.contact.content")}
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground font-medium mb-2">
                      {t("terms.contact.email_label")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("terms.contact.email")}
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
