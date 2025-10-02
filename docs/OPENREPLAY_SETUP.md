# OpenReplay Integration Setup

This document describes the OpenReplay integration setup for the Menteeno frontend application.

## Overview

OpenReplay is a session replay and analytics platform that helps track user interactions, performance metrics, and provides live session support through the Assist feature.

## Installation

The following packages have been installed:

```bash
pnpm add @openreplay/tracker @openreplay/tracker-assist
```

## Configuration

### Environment Variables

Add the following environment variable to your `.env.local` file:

```env
NEXT_PUBLIC_OPENREPLAY_PROJECT_KEY=nywLUMo5pPOy3xjNEBIo
```

### Files Created/Modified

1. **`src/lib/openreplay.ts`** - OpenReplay tracker configuration
2. **`src/components/openreplay-provider.tsx`** - React provider component
3. **`src/app/layout.tsx`** - Integration into root layout
4. **`env.example`** - Environment variable documentation

## Features Enabled

- **Session Recording**: Automatic recording of user sessions
- **Performance Monitoring**: Track Core Web Vitals and performance metrics
- **Live Assist**: Real-time support through live session sharing
- **Error Tracking**: Automatic error capture and reporting

## Usage

The OpenReplay tracker is automatically initialized when the application starts. No additional configuration is required.

### Live Assist

The Assist feature is enabled with the following configuration:

- Call confirmation dialog
- Start/Decline buttons for live calls
- Real-time session sharing

## Development vs Production

- **Development**: Secure mode is disabled for easier debugging
- **Production**: Full security features are enabled

## Monitoring

You can monitor your application's performance and user sessions through the OpenReplay dashboard at your project URL.

## Troubleshooting

If you encounter issues:

1. Verify the project key is correctly set in environment variables
2. Check browser console for any OpenReplay-related errors
3. Ensure the tracker is properly initialized in the browser's Network tab

## Security

- All sensitive data is automatically masked
- IP addresses are anonymized
- Secure mode is enabled in production
