"use client";

import DotPattern from "@/components/ui/dot-pattern";
import Particles from "@/components/ui/particles";
import { useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/lib/utils";

export const BackgroundPattern = () => {
  const { appearance } = useAppearance();
  const isLightTheme = appearance === "light";

  return (
    <>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)] !z-10",
          "dark:fill-slate-700"
        )}
      />
      <Particles
        className="absolute inset-0 !z-10"
        quantity={100}
        ease={80}
        color="#000"
        refresh
      />
      <Particles
        className="absolute inset-0 !z-10"
        quantity={100}
        ease={80}
        color="#fff"
        refresh
      />
    </>
  );
};
