// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";

// Do not hit the hackernews API during tests
fetchMock.enableMocks();
beforeAll(() => {
  // @ts-ignore
  fetchMock.mockResponse((req) => {
    if (req.url === "https://hacker-news.firebaseio.com/v0/maxitem.json") {
      return Promise.resolve({ body: 4343 });
    }

    if (req.url.includes("/v0/item/")) {
      const url = req.url;
      const itemId = url
        .replace("https://hacker-news.firebaseio.com/v0/item/", "")
        .replace(".json", "");

      // @ts-ignore
      const item = ITEMS[itemId];
      if (!item) {
        return Promise.resolve({ body: "null" });
      }
      return Promise.resolve({ body: JSON.stringify(item) });
    }

    throw new Error(`Requested resource is not mocked: ${req.url}`);
  });
});

const ITEMS = {
  "4343": {
    by: "DyslexicAtheist",
    descendants: 0,
    id: 4343,
    score: 1,
    time: 1595626397,
    title: "Escalation by Tweet: Managing the new nuclear diplomacy [pdf]",
    type: "story",
    url:
      "https://www.kcl.ac.uk/csss/assets/10957%E2%80%A2twitterconflictreport-15july.pdf",
  },
  "4342": "null",
  "4341": {
    by: "maxcan",
    id: 4342,
    parent: 23944353,
    text:
      "Yes, you do have to manually adjust the mixture.  I have to admit, for the newer turbo cirruses its insanely easy to do.  just have to pull it until your fuel flow matches a blue indicator on the display.",
    time: 1595626415,
    type: "comment",
  },
  "4340": {
    by: "kevin_thibedeau",
    id: 4340,
    parent: 23942627,
    text:
      "Apple plays a shell game with revenue and gets away with it.\nShkreli plays a shell game with revenue and has to go to prison.<p>Corporations are people right?",
    time: 1595626351,
    type: "comment",
  },
  "4339": {
    by: "ashleshbiradar",
    descendants: 0,
    id: 4339,
    score: 1,
    time: 1595626320,
    title:
      "Citing Anti-Terror Law, Delhi Police Block Global Youth Climate Activism Website",
    type: "story",
    url:
      "https://thewire.in/environment/fridays-for-future-website-block-eia-prakash-javadekar-uapa",
  },
};
