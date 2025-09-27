# Menteeno Frontend

A modern, scalable Next.js application built with TypeScript, Tailwind CSS, and internationalization support.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** with strict type checking
- **Tailwind CSS** for styling
- **Internationalization** (i18n) with English and Persian support
- **Theme Support** (Light/Dark/System)
- **Responsive Design** with mobile-first approach
- **Error Boundaries** for better error handling
- **Loading States** and skeleton components
- **API Client** with retry logic and error handling
- **Context Providers** for state management
- **Biome** for linting and formatting
- **Optimized Performance** with code splitting and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Linting**: Biome
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── navbar/           # Navigation components
│   ├── hero/             # Hero section components
│   └── magicui/          # Custom UI components
├── contexts/             # React contexts
│   ├── auth-context.tsx  # Authentication context
│   └── theme-context.tsx # Theme context
├── hooks/                # Custom hooks
│   ├── use-translation.tsx
│   └── use-appearance.tsx
├── lib/                  # Utility libraries
│   ├── api-client.ts     # API client
│   ├── constants.ts      # App constants
│   ├── env.ts           # Environment configuration
│   ├── i18n.ts          # Internationalization
│   └── utils.ts         # Utility functions
├── locales/              # Translation files
│   ├── en.json          # English translations
│   └── fa.json          # Persian translations
└── types/               # TypeScript type definitions
    ├── common.ts        # Common types
    └── index.d.ts       # Main type exports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd menteeno_frontend
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm format` - Format code

## 🌐 Internationalization

The application supports multiple languages:

- **English** (`/en`) - Default language
- **Persian** (`/fa`) - RTL support

Language switching is handled automatically through the middleware and context providers.

## 🎨 Theming

The application supports three theme modes:

- **Light** - Light color scheme
- **Dark** - Dark color scheme
- **System** - Follows system preference

Theme preferences are persisted in localStorage and cookies.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Menteeno
NEXT_PUBLIC_APP_DESCRIPTION=A place to grow your skills
```

### TypeScript Configuration

The project uses strict TypeScript configuration with:

- Strict type checking
- No implicit returns
- No fallthrough cases in switch
- Exact optional property types
- Path mapping for clean imports

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Lucide](https://lucide.dev/) - Icon library
