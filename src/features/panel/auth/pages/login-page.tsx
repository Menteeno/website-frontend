"use client";

import AppLogoIcon from "@/components/app-logo-icon";
import { BackgroundPattern } from "@/components/hero/background-pattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, BookOpen, Sparkles, Target, Users } from "lucide-react";

function authRedirectTo(path: string) {
  return `${window.location.origin}${path}`;
}

export function LoginPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState<"password" | "magic">("password");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      if (mode === "magic") {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: authRedirectTo("/panel/auth/callback"),
          },
        });

        if (error) throw error;

        toast.success(t("panel.auth.magicLinkSent"));

        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/panel/account");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("panel.auth.invalidCredentials"),
      );
    } finally {
      setLoading(false);
    }
  };

  const loginWithProvider = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: authRedirectTo("/panel/auth/callback"),
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto relative overflow-hidden px-4 py-4 lg:py-8">
      <BackgroundPattern />

      {/* Mobile */}
      <div className="lg:hidden w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <Link
            href={"/"}
            className="inline-flex items-center gap-2 text-xl font-bold text-foreground mb-4"
          >
            <AppLogoIcon className="size-6 fill-current" />
            Menteeno
          </Link>

          <h1 className="font-black text-3xl text-foreground mb-2">
            {t("panel.auth.loginTitle")}
          </h1>

          <p className="text-sm text-muted-foreground">{t("panel.common.appName")}</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <AuthForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              mode={mode}
              setMode={setMode}
              loading={loading}
              handleLogin={handleLogin}
              loginWithProvider={loginWithProvider}
              t={t}
            />
          </CardContent>
        </Card>
      </div>

      {/* Desktop */}

      <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:w-full">
        <div className="relative z-10 max-w-2xl text-center lg:text-start w-full lg:w-1/2 flex flex-col justify-center lg:pr-8">
          <div className="mb-8">
            <Link
              href={"/"}
              className="inline-flex items-center gap-2 text-2xl font-bold text-foreground mb-6"
            >
              <AppLogoIcon className="size-8 fill-current" />
              Menteeno
            </Link>

            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-foreground">
              {t("panel.auth.loginTitle")}
            </h1>

            <p className="mt-6 text-[17px] md:text-lg text-muted-foreground">
              {t("panel.common.appName")}
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <AuthForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                mode={mode}
                setMode={setMode}
                loading={loading}
                handleLogin={handleLogin}
                loginWithProvider={loginWithProvider}
                t={t}
              />
            </CardContent>
          </Card>
        </div>

        {/* Features */}

        <div className="lg:w-1/2 lg:pl-8 flex items-center justify-center">
          <div className="max-w-lg w-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="size-6 text-primary" />

              <h3 className="text-2xl font-bold">{t("panel.auth.features.title")}</h3>
            </div>

            <div className="space-y-6">
              <Feature
                icon={<Users className="size-6 text-primary" />}
                title={t("panel.auth.features.mentors")}
              />

              <Feature
                icon={<BookOpen className="size-6 text-primary" />}
                title={t("panel.auth.features.learning")}
              />

              <Feature
                icon={<Target className="size-6 text-primary" />}
                title={t("panel.auth.features.projects")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthForm({
  email,
  password,
  setEmail,
  setPassword,
  mode,
  setMode,
  loading,
  handleLogin,
  loginWithProvider,
  t,
}: any) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">{t("panel.auth.email")}</Label>

        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir="ltr"
        />
      </div>

      {mode === "password" && (
        <div className="space-y-2">
          <Label htmlFor="password">{t("panel.auth.password")}</Label>

          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            dir="ltr"
          />
        </div>
      )}

      <Button
        className="w-full rounded-full"
        disabled={loading}
        onClick={handleLogin}
      >
        <div className="flex items-center gap-2">
          <span>
            {mode === "magic" ? t("panel.auth.sendMagicLink") : t("panel.nav.login")}
          </span>

          <ArrowRight className="size-4" />
        </div>
      </Button>

      <Button
        variant="ghost"
        className="w-full"
        onClick={() => setMode(mode === "magic" ? "password" : "magic")}
      >
        {mode === "magic"
          ? t("panel.auth.loginWithPassword")
          : t("panel.auth.loginWithMagicLink")}
      </Button>

      <Link
        href="/panel/forgot-password"
        className="block text-sm text-[var(--color-primary)] hover:underline"
      >
        {t("panel.auth.forgotPassword")}
      </Link>

      <Separator />

      <Button
        variant="outline"
        className="w-full"
        onClick={() => loginWithProvider("google")}
      >
        {t("panel.auth.loginWithGoogle")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => loginWithProvider("github")}
      >
        GitHub
      </Button>

      <p className="text-sm text-muted-foreground">
        {t("panel.auth.noAccount")}{" "}
        <Link
          href="/panel/register"
          className="text-[var(--color-primary)] hover:underline"
        >
          {t("panel.nav.register")}
        </Link>
      </p>
    </div>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <p className="font-semibold">{title}</p>
    </div>
  );
}

export default LoginPage;
