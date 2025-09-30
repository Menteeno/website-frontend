# Menteeno API Services

This directory contains auto-generated API services using Redux Toolkit Query (RTK Query) based on the OpenAPI specification from the Menteeno backend.

## Files

- `menteenoApi.generated.ts` - Auto-generated RTK Query API service
- `README.md` - This documentation file

## Generated Files

The following files are automatically generated and should not be edited manually:

- `../api/openapi.types.ts` - TypeScript types generated from OpenAPI spec
- `menteenoApi.generated.ts` - RTK Query service with hooks

## Usage

### 1. Setup Redux Store

First, configure your Redux store to include the API service:

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { menteenoApi } from "./services/menteenoApi.generated";

export const store = configureStore({
  reducer: {
    [menteenoApi.reducerPath]: menteenoApi.reducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menteenoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Setup Provider

Wrap your app with the Redux Provider:

```typescript
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      {/* Your app components */}
    </Provider>
  );
}
```

### 3. Use Generated Hooks

Import and use the generated hooks in your components:

```typescript
import { useGetUsersQuery, useCreateUserMutation } from '../services/menteenoApi.generated';

export default function UsersPage() {
  // Query hook for GET requests
  const { data, error, isLoading } = useGetUsersQuery({
    query: { page: 1, limit: 10 }
  });

  // Mutation hook for POST/PUT/DELETE requests
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const handleCreateUser = async (userData: any) => {
    try {
      await createUser({ body: userData }).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => handleCreateUser({ name: 'New User' })}>
        Create User
      </button>
    </div>
  );
}
```

### 4. Path Parameters

For endpoints with path parameters, use the `path` property:

```typescript
import { useGetUserByIdQuery } from "../services/menteenoApi.generated";

export default function UserProfile({ userId }: { userId: string }) {
  const { data, error, isLoading } = useGetUserByIdQuery({
    path: { id: userId },
  });

  // ... rest of component
}
```

### 5. Query Parameters

For query parameters, use the `query` property:

```typescript
const { data } = useGetUsersQuery({
  query: {
    page: 1,
    limit: 20,
    search: "john",
  },
});
```

### 6. Request Body

For POST/PUT/PATCH requests, use the `body` property:

```typescript
const [updateUser] = useUpdateUserMutation();

const handleUpdate = async () => {
  await updateUser({
    path: { id: "123" },
    body: { name: "Updated Name", email: "new@email.com" },
  });
};
```

## Regenerating the API

To regenerate the API service when the backend changes:

```bash
# Generate both types and service
pnpm run generate:api

# Or generate them separately
pnpm run generate:types  # Generate TypeScript types
pnpm run generate:rtk    # Generate RTK Query service
```

## Type Safety

The generated code is fully type-safe:

- All request/response types are automatically inferred from the OpenAPI spec
- Path parameters are validated at compile time
- Query parameters and request bodies are typed according to the schema
- IDE autocomplete works for all generated hooks and types

## Error Handling

RTK Query provides built-in error handling:

```typescript
const { data, error, isLoading } = useGetUsersQuery({});

if (error) {
  // Handle different error types
  if ("status" in error) {
    // HTTP error
    console.error("HTTP Error:", error.status, error.data);
  } else {
    // Network error
    console.error("Network Error:", error.message);
  }
}
```

## Caching and Invalidation

RTK Query automatically handles caching. To invalidate cache:

```typescript
import { useDispatch } from "react-redux";
import { menteenoApi } from "./services/menteenoApi.generated";

const dispatch = useDispatch();

// Invalidate all user queries
dispatch(menteenoApi.util.invalidateTags(["User"]));

// Refetch a specific query
dispatch(menteenoApi.util.invalidateTags(["User", "LIST"]));
```

## Development

- The generator script is located at `scripts/generate-rtk-api.ts`
- Tests are in `scripts/__tests__/generate-rtk-api.test.ts`
- Generated files are automatically formatted with Prettier
