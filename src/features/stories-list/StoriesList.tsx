import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDescendingStories } from "./storiesSlice";
import ShowStory from "./components/ShowStory";
import {
  fetchMaxItem,
  fetchNextStory,
  selectMaxItemId,
} from "features/stories-list/storiesSlice";
import styles from "./stories-list.module.css";

function StoriesList() {
  const stories = useSelector(selectDescendingStories);
  useNextStory();

  return (
    <ul className={styles.list}>
      {stories.map((s) => (
        <ShowStory key={s.id} story={s} />
      ))}
    </ul>
  );
}

export default StoriesList;

function useNextStory() {
  const dispatch = useDispatch();
  const maxItemId = useSelector(selectMaxItemId);

  React.useEffect(() => {
    dispatch(fetchMaxItem());
  }, [dispatch]);

  React.useEffect(() => {
    if (maxItemId) {
      dispatch(fetchNextStory());
    }
  }, [dispatch, maxItemId]);
}
