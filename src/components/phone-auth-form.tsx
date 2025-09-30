"use client";

import AppLogoIcon from "@/components/app-logo-icon";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";
import { useTranslation } from "@/hooks/use-translation";
import {
  useV1_auth_send_codeMutation,
  useV1_auth_verify_codeMutation,
} from "@/services/menteenoApi.generated";
import { ArrowRight, Phone, Shield, Sparkles } from "lucide-react";
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
  const { t } = useTranslation();
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
      setErrors({
        general:
          error?.data?.message ||
          "Failed to send verification code. Please try again.",
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
      setErrors({
        general:
          error?.data?.message ||
          "Invalid verification code. Please try again.",
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
        <Label
          htmlFor="mobile"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Phone Number
        </Label>
        <div className="relative mt-1">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
          <Input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
            className="pl-10"
            placeholder="09123456789"
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
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isLoading || isSendingCode}
      >
        {isLoading || isSendingCode ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending Code...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Send Verification Code
            <ArrowRight className="size-4" />
          </div>
        )}
      </Button>
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="mx-auto size-12 text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Enter Verification Code
        </h2>
        <p className="text-muted-foreground">
          We sent a 4-digit code to {formData.mobile}
        </p>
      </div>

      <div>
        <Label
          htmlFor="code"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Verification Code
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
            placeholder="0000"
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
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isLoading || isVerifyingCode}
      >
        {isLoading || isVerifyingCode ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Verifying...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            Verify Code
            <ArrowRight className="size-4" />
          </div>
        )}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Didn't receive the code?
        </p>
        <button
          onClick={handleResendCode}
          disabled={countdown > 0}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {countdown > 0 ? `Resend in ${formatTime(countdown)}` : "Resend Code"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4"
          >
            <AppLogoIcon className="size-8 fill-current" />
            Menteeno
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to Menteeno
          </h1>
          <p className="text-muted-foreground">
            Sign in with your phone number to get started
          </p>
        </div>

        {/* Main Auth Card */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
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

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-5" />
              <h3 className="text-lg font-semibold">Why Choose Menteeno?</h3>
            </div>
            <p className="text-blue-100 mb-4 text-sm leading-relaxed">
              Join thousands of professionals growing their skills with
              personalized mentorship
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-100">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                Personalized Learning
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                Expert Mentors
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
                Real Projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
