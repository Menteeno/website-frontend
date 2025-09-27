import HeroHeader from "@/components/hero/hero-header";
import HeroIntroduce from "@/components/hero/hero-introduce";
import HeroProblem from "@/components/hero/hero-problem";
import Navbar from "@/components/navbar/navbar";
import Head from "next/head";

interface HomeProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Validate locale
  const validLocales = ["en", "fa"];
  if (!validLocales.includes(locale)) {
    return <div>Invalid locale</div>;
  }

  return (
    <>
      <Head>
        <title>Hello</title>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <HeroHeader />
      <HeroProblem />
      <HeroIntroduce />
    </>
  );
}
