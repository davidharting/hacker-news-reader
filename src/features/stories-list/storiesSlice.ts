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
   * The current "page" for our infinite scroll
   */
  page: number;
}

const initialState: StoriesState = {
  stories: [],
  maxItemId: null,
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
    const maxItemId = selectMaxItemId(state);
    const oldestStoryId = selectOldestStoryId(state);
    let itemIdToTry: number | null = oldestStoryId
      ? oldestStoryId - 1
      : maxItemId;
    if (!itemIdToTry) {
      console.warn("Attempted to fetch without an item ID to start with");
      return Promise.resolve();
    }
    let foundStory: boolean = false;
    let attempts: number = 0;
    const MAX_ATTEMPTS = 100000;

    console.log("itemIdToTry", itemIdToTry);

    // To avoid infinite looping if something unexpected occurs, cap the number of attempts
    // If we do not find a story after X attempts, simply give up trying
    // In an ideal world, we would alert the user to what happened and have some recovery process
    while (foundStory === false && attempts <= MAX_ATTEMPTS) {
      const response = await getStory(itemIdToTry);
      console.log(`response ${itemIdToTry}`, response);
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

export function selectCanFetch(state: RootState): boolean {
  const maxItemId = selectMaxItemId(state);
  const stories = selectDescendingStories(state);
  return stories.length > 0 || !!maxItemId;
}
