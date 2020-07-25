import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storiesReducer from "features/stories-list/storiesSlice";

const LOCAL_STORAGE_STATE_CACHE_KEY = "hacker-news-reader-redux-state";

export const store = configureStore({
  preloadedState: loadState(),
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

store.subscribe(() => {
  saveState(store.getState());
});

// Approach for persisting state came from Dan Abramov himself 🙏
// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
function saveState(state: { stories: Object }) {
  try {
    const serializedState = JSON.stringify({ stories: state.stories });
    localStorage.setItem(LOCAL_STORAGE_STATE_CACHE_KEY, serializedState);
  } catch (err) {
    console.error("Unable to persist state to local storage.", err);
  }
}

function loadState() {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_STATE_CACHE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
}
