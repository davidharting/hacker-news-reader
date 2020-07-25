import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScrolledToBottom } from "browser/window";
import Spinner from "elements/spinner";
import {
  fetchMaxItem,
  fetchNextStory,
  selectCanFetch,
  selectOldestStoryId,
  selectPageNumber,
  selectDescendingStories,
  pageForward,
  selectCurrentPageStatus,
  selectMaxItemId,
} from "./storiesSlice";
import ShowStory from "./components/ShowStory";
import Refresh from "./components/Refresh";
import styles from "./stories-list.module.css";

function StoriesList({ pageSize }: StoriesListProps) {
  const stories = useSelector(selectDescendingStories);
  // TODO: This hook should simply return the stories
  useStoryPage(pageSize);

  const pageStatus = useSelector(selectCurrentPageStatus(pageSize));

  return (
    <>
      <Refresh />
      <ul className={styles.list}>
        {stories.map((s) => (
          <li className={styles.listItem} key={s.id}>
            <ShowStory story={s} />
          </li>
        ))}
      </ul>
      {pageStatus === "INCOMPLETE" && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </>
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
  const maxItemId = useSelector(selectMaxItemId);
  const pageNumber = useSelector(selectPageNumber);

  const scrolledToBottom = useScrolledToBottom();

  React.useEffect(() => {
    if (!maxItemId) {
      dispatch(fetchMaxItem());
    }
  }, [dispatch, maxItemId]);

  React.useEffect(() => {
    if (canFetch && stories.length < pageSize * (pageNumber + 1)) {
      dispatch(fetchNextStory());
    }
    // fetch next story if oldestStory id changes
  }, [dispatch, canFetch, oldestStoryId, pageSize, stories.length, pageNumber]);

  React.useEffect(() => {
    if (scrolledToBottom) {
      dispatch(pageForward(pageSize));
    }
  }, [dispatch, pageSize, scrolledToBottom, stories.length]);
}
