import { getMaxItemId, getStory } from "../hacker-news";

// Here I am mostly just testing my own mock setup, and a bit of logic around the fetching

test("getMaxItemId should return 4342", async () => {
  const response = await getMaxItemId();
  if (response.status !== "ok") {
    throw new Error('Expected response status to be "ok"');
  }
  expect(response.payload).toBe(4343);
});

test("getStory should return the story when one is found", async () => {
  const response = await getStory(4343);
  if (response.status !== "ok") {
    throw new Error('Expected status to be "ok"');
  }
  expect(response.story.title).toContain("Escalation by Tweet");
});

test("getStory should return wrong_type when it finds a comment", async () => {
  const response = await getStory(4342);
  expect(response.status).toBe("wrong_type");
});
