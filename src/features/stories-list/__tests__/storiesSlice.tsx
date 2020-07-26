import {
  selectDescendingStories,
  selectOldestStoryId,
  selectCurrentPageStatus,
} from "../storiesSlice";
import { Story } from "models/story";

describe("#selectDescendingStories", () => {
  it("should return an empty array when there are no stories", () => {
    expect(selectDescendingStories(makeState([]))).toEqual([]);
  });

  it("should return stories in descending order by ID", () => {
    const descending = selectDescendingStories(makeState(STORIES));
    expect(descending.map((s) => s.id)).toEqual([99, 45, 27, 3]);
  });
});

describe("#selectOldestStoryId", () => {
  it("should return the ID of the oldest story, which will be the lowest ID", () => {
    expect(selectOldestStoryId(makeState(STORIES))).toBe(3);
  });

  it("should return null when there are no stories", () => {
    expect(selectOldestStoryId(makeState([]))).toBe(null);
  });
});

describe("#selectCurrentPageStatus", () => {
  it('should return "COMPLETE" when the current page is full', () => {
    const state = makeState(STORIES);
    expect(selectCurrentPageStatus(STORIES.length)(state)).toBe("COMPLETE");
  });

  it('should return "INCOMPLETE" when the current page is not full', () => {
    const state = makeState(STORIES, 1);
    expect(selectCurrentPageStatus(3)(state)).toBe("INCOMPLETE");
  });
});

function makeState(stories: Story[], page = 0) {
  return {
    counter: { value: 0 },
    stories: { maxItemId: null, page, stories },
  };
}

const STORIES = [
  {
    id: 3,
    by: "Mark",
    title: "An interesting title",
    url: "www.google.com",
    time: 1595709837,
  },
  {
    id: 45,
    by: "Sally",
    title: "Whoa a cool article",
    url: "www.wikipedia.org",
    time: 1595709802,
  },
  { id: 27, by: "Luke", title: "Title", url: "website", time: 1595709693 },
  {
    id: 99,
    by: "Katie",
    title: "Nature is neat!",
    url: "https://www.pbs.org/show/nature/",
    time: 1595709680,
  },
];
