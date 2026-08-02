import type { ReactNode } from "react";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-8 pt-28">
        {children}
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Menteeno
      </footer>
    </div>
  );
}
