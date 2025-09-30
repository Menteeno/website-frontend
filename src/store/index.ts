import { configureStore } from "@reduxjs/toolkit";
import { menteenoApi } from "../services/menteenoApi.generated";

export const store = configureStore({
  reducer: {
    [menteenoApi.reducerPath]: menteenoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menteenoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
