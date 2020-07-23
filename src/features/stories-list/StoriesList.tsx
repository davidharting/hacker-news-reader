import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStories } from "./storiesSlice";
import ShowStory from "./components/ShowStory";
import { fetchMaxItem } from "features/stories-list/storiesSlice";

function StoriesList() {
  const dispatch = useDispatch();
  const stories = useSelector(selectStories);

  React.useEffect(() => {
    dispatch(fetchMaxItem());
  }, [dispatch]);

  return (
    <ul>
      {stories.map((s) => (
        <ShowStory key={s.id} story={s} />
      ))}
    </ul>
  );
}

export default StoriesList;
