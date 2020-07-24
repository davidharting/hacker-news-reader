import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "app/store";
import { Story } from "models/story";
import { getMaxItemId, getStory } from "data-sources/hacker-news";

interface StoriesState {
  /**
   * All stories available to browse
   */
  stories: Story[];
  /**
   * The newest item in available via the hacker news API
   */
  maxItemId: number | null;
  /**
   * The next item to fetch
   */
  currentItemId: number | null;
  /**
   * The current "page" for our infinite scroll
   */
  page: number;
}

const initialState: StoriesState = {
  stories: [],
  maxItemId: null,
  currentItemId: null,
  page: 0,
};

export const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<Story>) => {
      state.stories.push(action.payload);
    },
    setMaxItem: (state, action: PayloadAction<number>) => {
      state.maxItemId = action.payload;
      if (state.currentItemId === null) {
        state.currentItemId = action.payload;
      }
    },
  },
});

const { setMaxItem } = storiesSlice.actions;
export const { addStory } = storiesSlice.actions;
export default storiesSlice.reducer;

export function fetchMaxItem(): AppThunk {
  return async (dispatch) => {
    try {
      const response = await getMaxItemId();
      if (response.status === "ok") {
        dispatch(setMaxItem(response.payload));
      }
    } catch (err) {
      // TODO: "recover" from error by alerting user to the problem
      console.error(err);
    }
  };
}

export function fetchNextStory(): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const oldestStoryId = selectOldestStoryId(state) || selectMaxItemId(state);
    if (!oldestStoryId) {
      console.warn(
        "Attempted to fetch next story before max item ID was known"
      );
      return Promise.resolve();
    }
    let itemIdToTry: number = oldestStoryId;
    let foundStory: boolean = false;
    let attempts: number = 0;
    const MAX_ATTEMPTS = 100000;

    // To avoid infinite looping if something unexpected occurs, cap the number of attempts
    // If we do not find a story after X attempts, simply give up trying
    // In an ideal world, we would alert the user to what happened and have some recovery process
    while (foundStory === false && attempts <= MAX_ATTEMPTS) {
      const response = await getStory(itemIdToTry);
      if (response.status === "ok") {
        foundStory = true;
        return dispatch(addStory(response.story));
      }
      itemIdToTry--;
      attempts++;
    }

    console.warn(`Unable to find a story after ${MAX_ATTEMPTS}`);
    return Promise.resolve();
  };
}

export function selectDescendingStories(state: RootState): Story[] {
  return [...state.stories.stories].sort((a, b) => b.id - a.id);
}

export function selectOldestStoryId(state: RootState): number | null {
  const stories = selectDescendingStories(state);
  if (stories.length < 1) {
    return null;
  }
  return stories[stories.length - 1].id;
}

export function selectMaxItemId(state: RootState): number | null {
  return state.stories.maxItemId;
}
