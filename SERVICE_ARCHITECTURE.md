# Service Architecture

This document describes the service layer architecture for backend API integration.

## Overview

Each feature has its own `services` folder that contains API integration logic. Services are responsible for:

- Making HTTP requests to backend APIs
- Handling request/response transformation
- Managing API errors
- Providing type-safe interfaces

## Structure

```
src/
├── shared/
│   └── services/
│       ├── ApiClient.ts      # Base HTTP client
│       └── index.ts
├── features/
│   ├── vehicles/
│   │   ├── services/
│   │   │   ├── vehicleService.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── api.ts        # API request/response types
│   │   │   └── index.ts
│   │   └── hooks/
│   │       └── useVehicleApi.ts  # React hook for API operations
│   └── parts/
│       ├── services/
│       │   ├── partService.ts
│       │   └── index.ts
│       ├── types/
│       │   ├── api.ts
│       │   └── index.ts
│       └── hooks/
│           └── usePartApi.ts
```

## Base API Client

The `ApiClient` class (`shared/services/ApiClient.ts`) uses **axios** for HTTP requests and provides:

- Automatic authentication token injection via interceptors
- Request/response interceptors for consistent error handling
- Automatic JSON parsing (handled by axios)
- Query parameter support
- Request timeout (30 seconds default)
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Type-safe request/response handling

### Usage Example

```typescript
import {apiClient} from '@/shared/services'

// GET request
const data = await apiClient.get<ResponseType>('/endpoint', {
    params: {page: 1, limit: 10},
})

// POST request
const result = await apiClient.post<ResponseType>('/endpoint', {
    key: 'value',
})
```

## Feature Services

### Vehicle Service

Located at: `features/vehicles/services/vehicleService.ts`

**Methods:**

- `getVehicles()` - Fetch all user vehicles
- `getVehicleById(id)` - Get a single vehicle
- `createVehicle(data)` - Create a new vehicle
- `updateVehicle(id, data)` - Update a vehicle
- `deleteVehicle(id)` - Delete a vehicle
- `setSelectedVehicle(id)` - Set the selected vehicle for filtering

**Usage:**

```typescript
import {vehicleService} from '@/features/vehicles'

const vehicles = await vehicleService.getVehicles()
const newVehicle = await vehicleService.createVehicle({
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
})
```

### Parts Service

Located at: `features/parts/services/partService.ts`

**Methods:**

- `getParts(params?)` - Get parts with optional filtering
- `getPartsByCategory(category, vehicleId?)` - Get parts by category
- `getCompatibleParts(vehicleId, category?)` - Get compatible parts for a vehicle
- `getPartById(id)` - Get a single part
- `searchParts(query, vehicleId?)` - Search parts
- `checkCompatibility(partId, vehicleId)` - Check part compatibility
- `createPart(data)` - Create a new part (admin)
- `updatePart(id, data)` - Update a part (admin)
- `deletePart(id)` - Delete a part (admin)

**Usage:**

```typescript
import {partService} from '@/features/parts'

const parts = await partService.getParts({category: 'engine', vehicleId: 'vehicle_123'})
const compatible = await partService.getCompatibleParts('vehicle_123')
```

## React Hooks for API Operations

### useVehicleApi

Located at: `features/vehicles/hooks/useVehicleApi.ts`

Provides React hooks that wrap service methods with:

- Loading state management
- Error handling
- Automatic store updates

**Usage:**

```typescript
import {useVehicleApi} from '@/features/vehicles'

const {loading, error, createVehicle, fetchVehicles} = useVehicleApi()

// In component
await createVehicle({make: 'Toyota', model: 'Camry', year: 2020})
```

### usePartApi

Located at: `features/parts/hooks/usePartApi.ts`

Similar to `useVehicleApi` but for parts operations.

## API Types

Each feature defines API-specific types in `types/api.ts`:

- **Request Types**: Data structures for API requests
- **Response Types**: Data structures for API responses
- **Error Types**: Error response structures

Example:

```typescript
// Request
export interface CreateVehicleRequest {
    make: string
    model: string
    year: number
    // ...
}

// Response
export type VehicleResponse = Vehicle

// Error
export interface VehicleApiError {
    message: string
    field?: string
}
```

## Configuration

API base URL is configured in `shared/constants/index.ts`:

```typescript
export const API_BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'https://api.example.com'
```

## Error Handling

The `ApiError` class provides structured error handling:

```typescript
import {ApiError} from '@/shared/services'

try {
    await vehicleService.createVehicle(data)
} catch (error) {
    if (error instanceof ApiError) {
        console.error(error.message) // Error message
        console.error(error.status) // HTTP status code
        console.error(error.data) // Error response data
    }
}
```

## Integration with Stores

Services can be used directly or through hooks that automatically update Zustand stores:

1. **Direct Service Usage**: For simple API calls without state management
2. **Hook Usage**: When you need loading states and automatic store updates

The hooks (`useVehicleApi`, `usePartApi`) automatically sync API responses with the Zustand stores, ensuring the UI stays in sync with backend data.

## Best Practices

1. **Always use services, not direct fetch calls**: Maintains consistency and error handling
2. **Use hooks for UI operations**: They provide loading states and error handling
3. **Type everything**: All requests and responses should be typed
4. **Handle errors gracefully**: Use try-catch and display user-friendly messages
5. **Keep services focused**: Each service handles one domain (vehicles, parts, etc.)
