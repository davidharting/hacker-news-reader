import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { /*  AppThunk, */ RootState } from "app/store";
import { Story } from "models/story";

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
  },
});

export const { addStory } = storiesSlice.actions;
export default storiesSlice.reducer;

export function selectStories(state: RootState): Story[] {
  return state.stories.stories;
}
