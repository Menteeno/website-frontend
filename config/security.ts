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
  default-src 'self' https://mycompany.com;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com;
  style-src 'self' 'unsafe-inline' https://fonts.bunny.net https://mycompany.com;
  img-src 'self' blob: data: https: https://mycompany.com;
  font-src 'self' data: https://fonts.bunny.net https://mycompany.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  connect-src 'self' https://menteeno-backend.chbk.app https://cdn.jsdelivr.net https://unpkg.com https://mycompany.com;
`;
