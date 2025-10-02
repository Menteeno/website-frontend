"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function ContactAnimation() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl">
        <DotLottieReact
          src="/assets/images/email.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "auto" }}
          renderConfig={{
            autoResize: true,
          }}
        />
      </div>
    </div>
  );
}
