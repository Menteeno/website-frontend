import { redirect } from "next/navigation";

export default function RootPage() {
  // This will be handled by middleware, but we need this for the build
  redirect("/en");
}
