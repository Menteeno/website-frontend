"use client";

import AppLogoIcon from "@/components/app-logo-icon";
import { BackgroundPattern } from "@/components/hero/background-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authRedirectTo } from "@/features/panel/auth/auth-redirect";
import { useTranslation } from "@/hooks/use-translation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
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
        error instanceof Error
          ? error.message
          : t("panel.auth.invalidCredentials"),
      );
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: authRedirectTo("/panel/auth/callback"),
      },
    });
    if (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-7rem)] items-center justify-center px-4 py-10">
      <BackgroundPattern />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-xl font-bold text-foreground"
          >
            <AppLogoIcon className="size-7 fill-current" />
            <span>{t("panel.common.appName")}</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            {t("panel.auth.loginTitle")}
          </h1>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="space-y-5">
            <Button
              type="button"
              variant="outline"
              className="h-11 w-full gap-3 border-border bg-background text-sm font-medium hover:bg-muted/60"
              disabled={googleLoading || loading}
              onClick={() => void loginWithGoogle()}
            >
              {googleLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <GoogleIcon className="size-5 shrink-0" />
              )}
              <span>{t("panel.auth.loginWithGoogle")}</span>
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {t("panel.auth.or")}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">{t("panel.auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  dir="ltr"
                  className="h-11"
                />
              </div>

              {mode === "password" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Label htmlFor="password">{t("panel.auth.password")}</Label>
                    <Link
                      href="/panel/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      {t("panel.auth.forgotPassword")}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    dir="ltr"
                    className="h-11"
                  />
                </div>
              ) : null}

              <Button
                type="submit"
                className="h-11 w-full gap-2"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ArrowLeft className="size-4" />
                )}
                <span>
                  {mode === "magic"
                    ? t("panel.auth.sendMagicLink")
                    : t("panel.nav.login")}
                </span>
              </Button>
            </form>

            <button
              type="button"
              className={cn(
                "w-full text-center text-sm text-muted-foreground transition-colors hover:text-foreground",
              )}
              onClick={() =>
                setMode(mode === "magic" ? "password" : "magic")
              }
            >
              {mode === "magic"
                ? t("panel.auth.loginWithPassword")
                : t("panel.auth.loginWithMagicLink")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
