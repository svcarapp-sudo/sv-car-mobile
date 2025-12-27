# 📁 Feature-Based Project Structure

This project uses a **feature-based architecture** for better organization and scalability.

## 🏗️ Structure Overview

```
src/
├── features/           # Feature modules (organized by business domain)
│   ├── auth/          # Authentication feature
│   │   ├── components/   # Auth-specific components
│   │   ├── screens/      # Auth screens
│   │   ├── hooks/        # Auth-specific hooks
│   │   ├── services/     # Auth API/services
│   │   ├── types/        # Auth TypeScript types
│   │   └── index.ts      # Public exports
│   │
│   ├── home/          # Home feature
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   │
│   └── [feature-name]/  # Other features...
│
├── shared/            # Shared/common code across features
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Shared custom hooks
│   ├── utils/         # Utility functions
│   ├── types/         # Shared TypeScript types
│   ├── constants/     # App-wide constants
│   ├── services/      # Shared services (API client, etc.)
│   └── index.ts       # Public exports
│
└── core/              # Core app configuration
    ├── navigation/    # Navigation setup
    ├── store/         # State management (Redux/Zustand)
    └── index.ts       # Public exports
```

## 🎯 Benefits of Feature-Based Structure

1. **Better Organization**: Code is grouped by business domain, making it easier to find related code
2. **Scalability**: Easy to add new features without cluttering existing structure
3. **Team Collaboration**: Different developers can work on different features without conflicts
4. **Maintainability**: Related code lives together, making refactoring easier
5. **Code Splitting**: Features can be lazy-loaded for better performance

## 📝 Usage Examples

### Importing from Features

```typescript
// Import from a feature
import { LoginScreen } from '@/features/auth'
import { HomeScreen } from '@/features/home'

// Import specific feature module
import { useAuth } from '@/features/auth/hooks'
import type { LoginCredentials } from '@/features/auth/types'
```

### Importing from Shared

```typescript
// Import shared utilities
import { formatCurrency } from '@/shared/utils'
import { APP_NAME } from '@/shared/constants'

// Import shared components
import { Button, Input } from '@/shared/components'

// Import shared hooks
import { useDebounce } from '@/shared/hooks'
```

### Importing from Core

```typescript
// Import navigation
import { AppNavigator } from '@/core/navigation'

// Import store
import { store } from '@/core/store'
```

## 🔧 Path Aliases

The following path aliases are configured:

- `@/features/*` → `src/features/*`
- `@/shared/*` → `src/shared/*`
- `@/core/*` → `src/core/*`
- `@/components` → `src/shared/components` (shortcut)
- `@/utils` → `src/shared/utils` (shortcut)
- `@/hooks` → `src/shared/hooks` (shortcut)
- `@/types` → `src/shared/types` (shortcut)
- `@/constants` → `src/shared/constants` (shortcut)
- `@/services` → `src/shared/services` (shortcut)
- `@/navigation` → `src/core/navigation` (shortcut)
- `@/store` → `src/core/store` (shortcut)

## 📋 Adding a New Feature

1. Create feature folder: `src/features/[feature-name]/`
2. Add subfolders as needed:
   - `components/` - Feature-specific components
   - `screens/` - Feature screens
   - `hooks/` - Feature-specific hooks
   - `services/` - Feature API/services
   - `types/` - Feature TypeScript types
3. Create `index.ts` in feature root to export public API
4. Use feature-specific code only within the feature
5. Share common code through `src/shared/`

## ✅ Best Practices

1. **Keep features independent**: Minimize cross-feature dependencies
2. **Use shared for common code**: Don't duplicate code across features
3. **Feature index.ts**: Export only what other features/app need
4. **Keep features focused**: Each feature should have a single responsibility
5. **Shared types**: Put common types in `src/shared/types/`
6. **Core setup**: Navigation and store configuration in `src/core/`

