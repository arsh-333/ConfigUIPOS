# TypeScript Stack Walkthrough - JSON-to-UI Framework

## What is TypeScript?

TypeScript is JavaScript with type safety. It helps catch errors before your code runs and makes development much easier with better IDE support.

## Tech Stack Used

### Frontend Stack
- **React 18** - UI library for building components
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Pre-built React components
- **React Query** - Data fetching and caching
- **Wouter** - Lightweight routing

### Backend Stack
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety for backend too

## Prerequisites Installation

### 1. Install Node.js
```bash
# Download from https://nodejs.org (version 18 or higher)
# Or using package managers:

# macOS (using Homebrew)
brew install node

# Windows (using Chocolatey)
choco install nodejs

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Verify Installation
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 8.x.x or higher
```

### 3. Install TypeScript Globally (Optional)
```bash
npm install -g typescript
tsc --version   # Should show TypeScript version
```

## Project Structure Explained

```
json-ui-framework/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Shadcn/ui components
│   │   │   ├── JsonEditor.tsx
│   │   │   ├── MobilePreview.tsx
│   │   │   └── WidgetRenderer.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useJsonValidation.ts
│   │   │   └── use-toast.ts
│   │   ├── lib/              # Utility functions
│   │   │   ├── utils.ts
│   │   │   └── queryClient.ts
│   │   ├── pages/            # Page components
│   │   │   └── JsonFramework.tsx
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── schema.ts
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # App entry point
│   │   └── index.css         # Global styles
│   └── index.html            # HTML template
├── server/                   # Backend Express server
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Data storage logic
│   └── vite.ts              # Vite integration
├── shared/                  # Shared between client/server
│   └── schema.ts            # Database schema
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS config
├── vite.config.ts           # Vite build configuration
└── README.md                # Documentation
```

## Key Files Explained

### 1. package.json - Dependencies
```json
{
  "scripts": {
    "dev": "npm run dev",           // Start development server
    "build": "vite build",          // Build for production
    "preview": "vite preview"       // Preview production build
  },
  "dependencies": {
    "react": "^18.0.0",            // UI library
    "@tanstack/react-query": "*",  // Data fetching
    "express": "*",                // Backend framework
    "drizzle-orm": "*",            // Database ORM
    "zod": "*",                    // Runtime type validation
    "tailwindcss": "*"             // CSS framework
  }
}
```

### 2. tsconfig.json - TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",           // JavaScript version to compile to
    "lib": ["ES2020", "DOM"],     // Available APIs
    "allowJs": true,              // Allow JavaScript files
    "skipLibCheck": true,         // Skip type checking of dependencies
    "esModuleInterop": true,      // Better module compatibility
    "allowSyntheticDefaultImports": true,
    "strict": true,               // Enable strict type checking
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",           // Module system
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,              // Don't output JS files (Vite handles this)
    "jsx": "react-jsx",          // JSX transformation
    "baseUrl": ".",              // Base directory for imports
    "paths": {
      "@/*": ["./client/src/*"]   // Path mapping for imports
    }
  }
}
```

### 3. vite.config.ts - Build Configuration
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],           // Enable React support
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),  // @ = client/src
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'  // Proxy API calls to backend
    }
  }
})
```

## TypeScript Concepts Used

### 1. Interface Definitions
```typescript
// Define the shape of data
export interface AppConfig {
  "app-theme": string;
  "logo-url": string;
  schemaVersion: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  "heading-text": string;
  is_main: boolean;
  widgets: Widget[];
}
```

### 2. Union Types
```typescript
// Widget can be one of these types
export interface Widget {
  type: "LABEL-INPUT" | "BUTTON" | "LABEL-LABEL" | "PAYMENT_BUTTONS";
  // ... other properties
}
```

### 3. Optional Properties
```typescript
export interface Widget {
  id: string;
  type: string;
  hidden?: boolean;        // Optional property (can be undefined)
  "ui-meta": WidgetUIMeta | null;  // Can be object or null
}
```

### 4. Generic Types (React)
```typescript
// useState with type
const [config, setConfig] = useState<AppConfig | null>(null);

// Props interface
interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: (json: string) => boolean;
}
```

## Development Workflow

### 1. Start Development
```bash
npm install    # Install all dependencies
npm run dev    # Start both frontend and backend
```

### 2. File Watching
- Vite automatically reloads when files change
- TypeScript compiler checks types in real-time
- Hot Module Replacement (HMR) for instant updates

### 3. Type Checking
```bash
# Check types without building
npx tsc --noEmit

# Or add to package.json scripts
"type-check": "tsc --noEmit"
```

## Common TypeScript Patterns Used

### 1. Component Props
```typescript
interface MobilePreviewProps {
  config: AppConfig | null;
}

export function MobilePreview({ config }: MobilePreviewProps) {
  // Component logic
}
```

### 2. Event Handlers
```typescript
const handleChange = (newValue: string) => {
  setLocalValue(newValue);
  onChange(newValue);
};

// In JSX
<input onChange={(e) => handleChange(e.target.value)} />
```

### 3. API Responses
```typescript
// Type the response from API calls
const { data, isLoading, error } = useQuery<AppConfig[]>({
  queryKey: ['/api/configs'],
  queryFn: () => fetch('/api/configs').then(res => res.json())
});
```

### 4. Custom Hooks
```typescript
export function useJsonValidation() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState<ValidationError | null>(null);
  
  const validateJson = useCallback((jsonString: string): boolean => {
    // Validation logic
  }, []);

  return { config, error, validateJson };
}
```

## Benefits of This Stack

1. **Type Safety** - Catch errors before runtime
2. **Developer Experience** - Excellent IDE support with autocomplete
3. **Performance** - Vite's fast build times
4. **Maintainability** - Clear interfaces and component structure
5. **Scalability** - Easy to add new features and widget types

## Next Steps for Learning

1. **Practice TypeScript basics** - interfaces, types, generics
2. **Learn React patterns** - hooks, component composition
3. **Understand build tools** - how Vite works
4. **Explore the codebase** - see how types flow through the app
5. **Add new features** - try adding a new widget type

This framework is a great example of modern TypeScript development practices!