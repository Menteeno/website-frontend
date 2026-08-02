"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function ContactAnimation() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl aspect-[4/3]">
        <DotLottieReact
          src="/assets/images/email.lottie"
          loop
          autoplay
          renderConfig={{
            autoResize: false,
          }}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
