/**
 * Security headers configuration
 */
export const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * Content Security Policy
 */
export const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com https://app.chatwoot.com;
  style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://app.chatwoot.com;
  img-src 'self' blob: data: https: https://www.google-analytics.com https://www.googletagmanager.com https://app.chatwoot.com;
  font-src 'self' data: https://fonts.bunny.net https://app.chatwoot.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  frame-src 'self' https://neshan.org https://www.google.com https://app.chatwoot.com;
  worker-src 'self' blob:;
  connect-src 'self' https://menteeno-backend.chbk.app https://cdn.jsdelivr.net https://unpkg.com https://*.google-analytics.com https://*.google.com https://www.google-analytics.com https://www.googletagmanager.com https://openreplay.com https://app.openreplay.com https://app.chatwoot.com https://hzghfjadfektvrunysdh.supabase.co blob:;
`;
