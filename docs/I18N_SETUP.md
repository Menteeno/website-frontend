# Next.js App Router i18n Setup

This project has been configured with Next.js App Router internationalization (i18n) support for English and Persian languages.

## Features

- ✅ App Router compatible i18n routing
- ✅ Automatic locale detection from browser headers
- ✅ Language switching without page reload
- ✅ Type-safe translations with TypeScript
- ✅ Support for nested translation keys
- ✅ Placeholder replacement in translations
- ✅ RTL support for Persian language
- ✅ Middleware-based locale detection

## File Structure

```
src/
├── locales/
│   ├── en.json          # English translations
│   └── fa.json          # Persian translations
├── lib/
│   └── lang.ts          # Translation utilities and hooks
├── middleware.ts        # Locale detection and routing
└── components/
    ├── language-switcher.tsx
    └── navbar/
        └── language.tsx  # Updated language switcher
```

## Configuration

### Next.js Config (`next.config.ts`)

For App Router, we don't use the built-in i18n config. Instead, we handle i18n with middleware and custom hooks:

```typescript
const nextConfig: NextConfig = {
  // Note: i18n config is for Pages Router
  // For App Router, we handle i18n with middleware and custom hooks
};
```

### Middleware (`src/middleware.ts`)

The middleware automatically detects the user's preferred language from the `Accept-Language` header and redirects to the appropriate locale URL. This approach is compatible with the App Router.

## Usage

### Using Translations in Components

```tsx
"use client";

import { useTranslation } from "@/lib/lang";

export function MyComponent() {
  const { t, locale, changeLanguage } = useTranslation();

  return (
    <div>
      <h1>{t("messages.home-header.title")}</h1>
      <p>{t("messages.home-header.description")}</p>
      <button onClick={() => changeLanguage("fa")}>Switch to Persian</button>
    </div>
  );
}
```

### Translation Keys

Use dot notation for nested keys:

```json
{
  "messages": {
    "home-header": {
      "title": "Menteeno",
      "description": "Description text..."
    }
  }
}
```

Access with: `t("messages.home-header.title")`

### Placeholder Replacement

```json
{
  "auth": {
    "throttle": "Too many login attempts. Please try again in :seconds seconds."
  }
}
```

```tsx
t("auth.throttle", { seconds: 60 });
// Output: "Too many login attempts. Please try again in 60 seconds."
```

## Available Locales

- `en` - English (default)
- `fa` - Persian (فارسی)

## URL Structure

- English: `/en/page` or `/page` (default)
- Persian: `/fa/page`

## Components

### LanguageSwitcher

A dropdown component for switching between languages:

```tsx
import { LanguageSwitcher } from "@/components/language-switcher";

<LanguageSwitcher />;
```

### Updated Language Component

The existing language component in `src/components/navbar/language.tsx` has been updated to use the new i18n system.

## Demo Page

Visit `/i18n-demo` to see the i18n functionality in action with examples of:

- Language switching
- Translation examples
- Code snippets for implementation

## Adding New Translations

1. Add the translation key to both `src/locales/en.json` and `src/locales/fa.json`
2. Use the key in your component with `t("your.key")`

## Server-Side Translations

For server-side rendering, use the `getTranslation` function:

```typescript
import { getTranslation } from "@/lib/lang";

export async function getServerSideProps({ locale }) {
  const title = getTranslation(locale, "messages.home-header.title");

  return {
    props: { title },
  };
}
```

## RTL Support

The Persian locale (`fa`) includes RTL support. The language switcher automatically handles direction changes.

## App Router Compatibility

This i18n setup is specifically designed for Next.js App Router and provides:

- Full compatibility with App Router architecture
- Middleware-based locale detection
- Custom hooks for client-side translations
- Server-side translation utilities
- Type safety with TypeScript
- SEO-friendly URLs with locale prefixes

## Migration from Previous i18n Setup

The previous `lang.js` setup has been replaced with an App Router compatible i18n system. The new system provides:

- Better performance with automatic code splitting
- SEO-friendly URLs
- Automatic locale detection via middleware
- Type safety with TypeScript
- Better integration with App Router
- No conflicts with server/client components

All existing translation keys have been migrated to the new structure in the locale files.
