# AGENTS.md - AI Assistant Instructions for VMIS

## Project Overview

VMIS (Vaccine Management Information System) is a full-stack web application for managing child vaccination schedules. This document helps AI assistants understand the project structure and conventions.

## Frontend Stack

- **Framework:** Vite 8 + React 19 + TypeScript 5.9
- **Styling:** Tailwind CSS 4.2 with shadcn/ui (Radix + Nova preset)
- **Icons:** Lucide React
- **Toasts:** Sonner
- **Package Manager:** pnpm

## Key Conventions

### Imports
- Use `@/` alias for src imports (e.g., `@/components/ui/button`)
- shadcn components live in `src/components/ui/`
- Custom components go in `src/components/`

### Adding New shadcn Components
```bash
pnpm dlx shadcn@latest add [component-name]
```

### Styling
- Use Tailwind CSS classes exclusively
- Use `cn()` utility from `@/lib/utils` for conditional classes
- CSS variables defined in `src/index.css` for theming

### Component Patterns
```tsx
import { cn } from "@/lib/utils"

interface MyComponentProps {
  className?: string
  // ...
}

export function MyComponent({ className, ...props }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {/* content */}
    </div>
  )
}
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components (DO NOT EDIT)
│   │   └── *.tsx         # Custom components
│   ├── pages/            # Route pages
│   ├── hooks/            # Custom hooks
│   ├── services/         # API services
│   ├── types/            # TypeScript types
│   └── lib/
│       └── utils.ts      # cn() utility
├── components.json       # shadcn config
└── vite.config.ts
```

## Available shadcn Components

alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, checkbox, collapsible, context-menu, dialog, drawer, dropdown-menu, hover-card, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, skeleton, slider, sonner, switch, table, tabs, textarea, toggle, toggle-group, tooltip

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm lint       # Run ESLint
pnpm preview    # Preview production build
```

## API Integration

- Backend runs at `http://localhost:8080`
- API base path: `/api`
- JWT auth stored in localStorage
- Use axios for HTTP requests

## Do NOT

- Edit files in `src/components/ui/` directly (re-add with CLI if needed)
- Use plain CSS (use Tailwind only)
- Use `any` type (use proper TypeScript types)
- Commit `.env` files or secrets
