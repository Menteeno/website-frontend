"use client";

import AppLogoIcon from "@/components/app-logo-icon";
import { BackgroundPattern } from "@/components/hero/background-pattern";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import {
  useV1_auth_send_codeMutation,
  useV1_auth_verify_codeMutation,
} from "@/services/menteenoApi.generated";
import {
  ArrowRight,
  BookOpen,
  Phone,
  Shield,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  mobile: string;
  code: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  mobile?: string;
  code?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
}

type AuthStep = "phone" | "verification" | "profile";

export default function PhoneAuthForm() {
  const { t, locale } = useTranslation();
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState<AuthStep>("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    mobile: "",
    code: "",
    firstName: "",
    lastName: "",
  });

  // RTK Query hooks
  const [sendCode, { isLoading: isSendingCode }] =
    useV1_auth_send_codeMutation();
  const [verifyCode, { isLoading: isVerifyingCode }] =
    useV1_auth_verify_codeMutation();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validatePhone = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.mobile) {
      newErrors.mobile = "Phone number is required";
    } else if (!/^09\d{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Please enter a valid Iranian phone number (09xxxxxxxxx)";
    }

    console.log("Phone validation:", {
      mobile: formData.mobile,
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCode = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.code) {
      newErrors.code = "Verification code is required";
    } else if (!/^\d{4}$/.test(formData.code)) {
      newErrors.code = "Please enter a 4-digit verification code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateProfile = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async () => {
    if (!validatePhone()) return;

    setIsLoading(true);
    setErrors({});

    try {
      console.log("Sending code to:", formData.mobile);
      console.log(
        "API Base URL:",
        process.env.NEXT_PUBLIC_API_URL ||
          "https://menteeno-backend.chbk.app/api"
      );

      const result = await sendCode({
        body: {
          mobile: formData.mobile,
        },
      }).unwrap();

      console.log("Code sent successfully:", result);
      setCurrentStep("verification");
      startCountdown();
    } catch (error: any) {
      console.error("Failed to send code:", error);
      console.error("Error details:", {
        status: error?.status,
        data: error?.data,
        message: error?.message,
        originalStatus: error?.originalStatus,
      });

      // RTK Query error structure
      const errorMessage =
        error?.data?.message ||
        error?.data?.errors?.mobile?.[0] ||
        error?.message ||
        "Failed to send verification code. Please try again.";

      setErrors({
        general: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!validateCode()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = await verifyCode({
        body: {
          mobile: formData.mobile,
          code: formData.code,
        },
      }).unwrap();

      console.log("Code verified successfully:", result);

      // Extract token from response
      const token = result.data?.access_token;
      if (token) {
        // For now, we'll skip profile step and login directly
        // In a real app, you might want to collect profile info first
        const user = {
          id: 1, // This would come from the API response
          name: "User", // This would come from the API response
          mobile: formData.mobile,
          mobile_verified_at: new Date().toISOString(),
          email_verified_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        login(user, token);
        window.location.href = "/";
      } else {
        setErrors({ general: "Invalid response from server" });
      }
    } catch (error: any) {
      console.error("Failed to verify code:", error);

      // RTK Query error structure
      const errorMessage =
        error?.data?.message ||
        error?.data?.errors?.code?.[0] ||
        error?.message ||
        "Invalid verification code. Please try again.";

      setErrors({
        general: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    await handleSendCode();
  };

  const startCountdown = () => {
    setCountdown(120); // 2 minutes
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderPhoneStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="mobile" className="text-sm font-medium text-foreground">
          {t("auth.phone_auth.phone_number")}
        </Label>
        <div className="relative mt-1">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className="pl-10"
            placeholder={t("auth.phone_auth.phone_placeholder")}
            disabled={isLoading}
            maxLength={11}
          />
        </div>
        {errors.mobile && (
          <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
        )}
      </div>

      <Button
        onClick={handleSendCode}
        size="lg"
        className="w-full rounded-full text-base"
        disabled={isLoading || isSendingCode}
      >
        {isLoading || isSendingCode ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t("auth.phone_auth.sending_code")}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{t("auth.phone_auth.send_code")}</span>
            <ArrowRight className="size-4" />
          </div>
        )}
      </Button>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto size-12 text-primary mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {t("auth.phone_auth.enter_verification_code")}
        </h2>
        <p className="text-muted-foreground">
          {t("auth.phone_auth.code_sent_to", { phone: formData.mobile })}
        </p>
      </div>

      <div>
        <Label htmlFor="code" className="text-sm font-medium text-foreground">
          {t("auth.phone_auth.verification_code")}
        </Label>
        <div className="relative mt-1">
          <Input
            id="code"
            type="text"
            value={formData.code}
            onChange={(e) =>
              handleInputChange("code", e.target.value.replace(/\D/g, ""))
            }
            className="text-center text-lg tracking-widest"
            placeholder={t("auth.phone_auth.verification_code_placeholder")}
            disabled={isLoading}
            maxLength={4}
          />
        </div>
        {errors.code && (
          <p className="mt-1 text-sm text-red-600">{errors.code}</p>
        )}
      </div>

      <Button
        onClick={handleVerifyCode}
        size="lg"
        className="w-full rounded-full text-base"
        disabled={isLoading || isVerifyingCode}
      >
        {isLoading || isVerifyingCode ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {t("auth.phone_auth.verifying")}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>{t("auth.phone_auth.verify_code")}</span>
            <ArrowRight className="size-4" />
          </div>
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          {t("auth.phone_auth.didnt_receive_code")}
        </p>
        <button
          onClick={handleResendCode}
          disabled={countdown > 0}
          className="text-sm font-medium text-primary hover:text-primary/80 disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          {countdown > 0
            ? t("auth.phone_auth.resend_in", { time: formatTime(countdown) })
            : t("auth.phone_auth.resend_code")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto relative overflow-hidden px-4 py-4 lg:py-8">
      <BackgroundPattern />

      {/* Mobile Layout */}
      <div className="lg:hidden w-full max-w-md mx-auto">
        {/* Logo and Header */}
        <div className="text-center mb-6">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xl font-bold text-foreground mb-4"
          >
            <AppLogoIcon className="size-6 fill-current" />
            Menteeno
          </Link>

          <h1 className="font-black text-3xl text-foreground mb-2">
            {t("auth.phone_auth.welcome_to")}
          </h1>

          <p className="text-sm text-muted-foreground">
            {t("auth.phone_auth.sign_in_subtitle")}
          </p>
        </div>

        {/* Main Auth Card */}
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6">
            {errors.general && (
              <Alert className="mb-4" variant="destructive">
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
            )}

            {currentStep === "phone" && renderPhoneStep()}
            {currentStep === "verification" && renderVerificationStep()}
          </CardContent>
        </Card>

        {/* Mobile Features - Compact */}
        <div className="mt-6 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>{t("auth.phone_auth.features.stats.students")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>{t("auth.phone_auth.features.stats.mentors")}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>{t("auth.phone_auth.features.stats.support")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-center lg:w-full">
        {/* Left Side - Content */}
        <div className="relative z-10 max-w-2xl text-center lg:text-start w-full lg:w-1/2 flex flex-col justify-center lg:pr-8">
          {/* Logo and Header */}
          <div className="mb-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-2xl font-bold text-foreground mb-6"
            >
              <AppLogoIcon className="size-8 fill-current" />
              Menteeno
            </Link>

            <div className="mt-6">
              <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-foreground">
                {t("auth.phone_auth.welcome_to")}
              </h1>
            </div>

            <p className="mt-6 text-[17px] md:text-lg text-muted-foreground">
              {t("auth.phone_auth.sign_in_subtitle")}
            </p>
          </div>

          {/* Main Auth Card */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {errors.general && (
                <Alert className="mb-6" variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {currentStep === "phone" && renderPhoneStep()}
              {currentStep === "verification" && renderVerificationStep()}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Features */}
        <div className="lg:w-1/2 lg:pl-8 flex items-center justify-center">
          <div className="max-w-lg w-full flex flex-col justify-center">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Sparkles className="size-6 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">
                  {t("auth.phone_auth.features.title")}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Users className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t("auth.phone_auth.features.expert_mentors")}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {t("auth.phone_auth.features.expert_mentors_desc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <BookOpen className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t("auth.phone_auth.features.personalized_learning")}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {t("auth.phone_auth.features.personalized_learning_desc")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Target className="size-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t("auth.phone_auth.features.real_projects")}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {t("auth.phone_auth.features.real_projects_desc")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary/20">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{t("auth.phone_auth.features.stats.students")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{t("auth.phone_auth.features.stats.mentors")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{t("auth.phone_auth.features.stats.support")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
