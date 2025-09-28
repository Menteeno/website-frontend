import AuthForm from "@/components/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Menteeno - Start Your Growth Journey",
  description:
    "Join thousands of professionals who are growing their skills with personalized mentorship, real training, and a supportive community.",
};

export default function AuthPage() {
  return <AuthForm />;
}
