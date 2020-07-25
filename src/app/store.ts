import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storiesReducer from "features/stories-list/storiesSlice";

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
