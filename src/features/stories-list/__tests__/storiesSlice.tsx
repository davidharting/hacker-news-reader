import { selectDescendingStories, selectOldestStoryId } from "../storiesSlice";
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

function makeState(stories: Story[]) {
  return {
    counter: { value: 0 },
    stories: { maxItemId: null, page: 0, stories },
  };
}

const STORIES = [
  {
    id: 3,
    by: "Mark",
    title: "An interesting title",
    url: "www.google.com",
  },
  {
    id: 45,
    by: "Sally",
    title: "Whoa a cool article",
    url: "www.wikipedia.org",
  },
  { id: 27, by: "Luke", title: "Title", url: "website" },
  {
    id: 99,
    by: "Katie",
    title: "Nature is neat!",
    url: "https://www.pbs.org/show/nature/",
  },
];
