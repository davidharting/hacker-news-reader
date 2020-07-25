import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDescendingStories } from "./storiesSlice";
import ShowStory from "./components/ShowStory";
import {
  fetchMaxItem,
  fetchNextStory,
  selectCanFetch,
  selectOldestStoryId,
} from "features/stories-list/storiesSlice";
import styles from "./stories-list.module.css";

function StoriesList({ pageSize }: StoriesListProps) {
  const stories = useSelector(selectDescendingStories);
  useStoryPage(pageSize);

  return (
    <ul className={styles.list}>
      {stories.map((s) => (
        <li className={styles.listItem} key={s.id}>
          <ShowStory story={s} />
        </li>
      ))}
    </ul>
  );
}

export default StoriesList;

interface StoriesListProps {
  pageSize: number;
}

function useStoryPage(pageSize: number) {
  const dispatch = useDispatch();
  const stories = useSelector(selectDescendingStories);
  const canFetch = useSelector(selectCanFetch);
  const oldestStoryId = useSelector(selectOldestStoryId);

  React.useEffect(() => {
    dispatch(fetchMaxItem());
  }, [dispatch]);

  React.useEffect(() => {
    if (canFetch && stories.length < pageSize) {
      dispatch(fetchNextStory());
    }
    // fetch next story if oldestStory id changes
  }, [dispatch, canFetch, oldestStoryId, pageSize, stories.length]);
}
