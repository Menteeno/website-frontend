import { locales } from "@/lib/i18n";

interface SurveyPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const locale of locales) {
    params.push({ locale, slug: "placeholder" });
  }
  return params;
}

export default async function SurveyPage({ params }: SurveyPageProps) {
  const { locale, slug } = await params;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Survey Not Found</h1>
        <p className="text-muted-foreground">
          The survey "{slug}" could not be found.
        </p>
      </div>
    </div>
  );
}
