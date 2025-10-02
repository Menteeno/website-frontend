import PhoneAuthForm from "@/components/phone-auth-form";
import { locales } from "@/lib/i18n";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Menteeno - Start Your Growth Journey",
  description:
    "Join thousands of professionals who are growing their skills with personalized mentorship, real training, and a supportive community.",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AuthPage() {
  return <PhoneAuthForm />;
}
