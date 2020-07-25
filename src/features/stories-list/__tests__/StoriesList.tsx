import React from "react";
import { screen } from "@testing-library/react";
import { render } from "test-utils";
import StoriesList from "features/stories-list/StoriesList";

test("fetches and renders stories", async () => {
  render(<StoriesList pageSize={2} />);
  // Look at setupTests for the expected items
  const firstStory = await screen.findByText(/escalation by tweet/i);
  expect(firstStory).toBeInTheDocument();

  const secondStory = await screen.findByText(/citing anti-terror law/i);
  expect(secondStory).toBeInTheDocument();
});
