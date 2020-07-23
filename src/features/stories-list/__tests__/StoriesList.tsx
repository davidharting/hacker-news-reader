import React from "react";
import { screen } from "@testing-library/react";
import { render } from "test-utils";
import { store } from "app/store";

import StoriesList from "features/stories-list/StoriesList";
import { addStory } from "features/stories-list/storiesSlice";

test("renders a story", () => {
  store.dispatch(
    addStory({
      id: 4,
      by: "Bilbo",
      title: "The Hobbit",
      url:
        "https://novel22.net/the-hobbit/-chapter-1-an-unexpected-party-128586.html",
    })
  );

  render(<StoriesList />);
  return screen.findByText(/the hobbit/i).then((node) => {
    expect(node).toBeInTheDocument();
  });
});
