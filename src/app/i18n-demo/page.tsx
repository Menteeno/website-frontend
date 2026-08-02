"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

export default function I18nDemoPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Next.js i18n Demo</h1>
        <LanguageSwitcher />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Locale</CardTitle>
            <CardDescription>Current language setting</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono">{locale}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Translation Examples</CardTitle>
            <CardDescription>
              Sample translations from your locale files
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Home Header Title:</strong>
              <p>{t("messages.home-header.title")}</p>
            </div>
            <div>
              <strong>Home Header Description:</strong>
              <p>{t("messages.home-header.description")}</p>
            </div>
            <div>
              <strong>Navbar Items:</strong>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  {t("messages.navbar.home")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("messages.navbar.dashboard")}
                </Button>
                <Button variant="outline" size="sm">
                  {t("messages.navbar.blog")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Hero Introduce Section</CardTitle>
            <CardDescription>
              Complete translated section from your hero component
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Question:</strong>
              <p>
                {t("messages.hero-introduce.question")}{" "}
                <code>{t("messages.hero-introduce.debugger")}</code>{" "}
                {t("messages.hero-introduce.question-continue")}
              </p>
            </div>
            <div>
              <strong>Title:</strong>
              <p>
                {t("messages.hero-introduce.title")}{" "}
                <em>{t("messages.hero-introduce.space")}</em>{" "}
                {t("messages.hero-introduce.title-continue")}
              </p>
            </div>
            <div>
              <strong>Features:</strong>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>{t("messages.hero-introduce.features.mentorship")}</li>
                <li>{t("messages.hero-introduce.features.learning-plan")}</li>
                <li>{t("messages.hero-introduce.features.teamwork")}</li>
                <li>{t("messages.hero-introduce.features.support")}</li>
                <li>{t("messages.hero-introduce.features.feedback")}</li>
                <li>{t("messages.hero-introduce.features.progress")}</li>
                <li>{t("messages.hero-introduce.features.challenges")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          How to use translations in your components:
        </h3>
        <pre className="text-sm overflow-x-auto">
          {`import { useTranslation } from "@/hooks/use-translation";

export function MyComponent() {
  const { t, locale, changeLanguage } = useTranslation();
  
  return (
    <div>
      <h1>{t("messages.home-header.title")}</h1>
      <p>{t("messages.home-header.description")}</p>
      <button onClick={() => changeLanguage("fa")}>
        Switch to Persian
      </button>
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}
