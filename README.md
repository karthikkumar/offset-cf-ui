# Offset CF UI

A dashboard for managing carbon offset merchant registrations, widget configurations, and customer opt-in tracking.

## Product Overview

Offset CF helps Shopify stores offer carbon offset options to their customers. This dashboard allows merchants to:

- Register and onboard new Shopify stores
- Configure carbon offset widgets for their e-commerce stores
- Track customer opt-ins and generate reports

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query
- **Forms**: React Hook Form + Zod validation

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173)

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/ui/     # Reusable UI components
├── pages/            # Page components
├── services/         # API services
├── types/            # TypeScript interfaces
└── assets/           # Images and logo
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
