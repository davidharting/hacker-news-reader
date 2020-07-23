import React from "react";
import { useSelector } from "react-redux";
import { selectStories } from "./storiesSlice";
import ShowStory from "./components/ShowStory";

function Stories() {
  const stories = useSelector(selectStories);
  return (
    <ul>
      {stories.map((s) => (
        <ShowStory key={s.id} story={s} />
      ))}
    </ul>
  );
}

export default Stories;
