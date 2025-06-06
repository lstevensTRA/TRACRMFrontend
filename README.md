# Dataverse React Application

A React TypeScript application for Dataverse integration with Microsoft authentication.

## Features

- React 18 + TypeScript + Vite
- Microsoft Authentication (MSAL)
- Dataverse API Integration
- Tailwind CSS for styling
- React Query for data management
- React Hook Form for forms
- React Router for navigation

## Prerequisites

- Node.js 16+
- npm or yarn
- Azure App Registration (configured with provided details)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Configuration

The application is pre-configured with the following Azure settings:

- Client ID: b65d8e0b-8c61-40bb-8bc0-33ed4023f2dc
- Tenant ID: 185fc38c-2c1b-4307-a164-24a4072e83e1
- Dataverse Environment: https://taxrelief-dev.crm.dynamics.com
- Environment ID: ff079966-c6d8-e92e-8786-cf4f838bdf04

## Project Structure

```
src/
  components/
    ui/          # Reusable UI components
    layout/      # Layout components
    entities/    # Entity-specific components
    auth/        # Authentication components
  services/
    dataverse.ts # Dataverse API service
    auth.ts      # Authentication service
  hooks/         # Custom React hooks
  types/         # TypeScript interfaces
  pages/         # Page components
  utils/         # Utility functions
  config/        # Configuration files
```

## Testing Configuration

Visit http://localhost:3000/config-test to verify:
- MSAL Configuration
- Microsoft Graph API Access
- Dataverse API Connection

## Development

- Use `npm run dev` for development
- Use `npm run build` for production build
- Use `npm run preview` to preview production build

## License

MIT 