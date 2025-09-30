import { configureStore } from "@reduxjs/toolkit";
import { menteenoApi } from "../services/menteenoApi.generated";

// Example Redux store configuration
export const store = configureStore({
  reducer: {
    [menteenoApi.reducerPath]: menteenoApi.reducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menteenoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
