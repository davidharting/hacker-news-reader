import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNetworkStatus } from "browser/network";
import { useScrolledToBottom } from "browser/window";
import Spinner from "elements/spinner/index";
import {
  fetchMaxItem,
  fetchNextStory,
  selectCanFetch,
  selectOldestStoryId,
  selectDescendingStories,
  pageForward,
  selectCurrentPageStatus,
  selectMaxItemId,
} from "./storiesSlice";
import ShowStory from "./components/ShowStory";
import Refresh from "./components/Refresh";
import styles from "./stories-list.module.css";

function StoriesList({ pageSize }: StoriesListProps) {
  const stories = useInfiniteScrollStories(pageSize);
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

/**
 * This hook is responsible for
 * @param pageSize
 */
function useInfiniteScrollStories(pageSize: number) {
  useMaxItemId();
  const dispatch = useDispatch();

  const stories = useSelector(selectDescendingStories);
  const canFetch = useSelector(selectCanFetch);
  const pageStatus = useSelector(selectCurrentPageStatus(pageSize));
  const oldestStoryId = useSelector(selectOldestStoryId);

  const networkStatus = useNetworkStatus();
  const scrolledToBottom = useScrolledToBottom();

  React.useEffect(() => {
    if (networkStatus === "online" && canFetch && pageStatus === "INCOMPLETE") {
      dispatch(fetchNextStory());
    }
  }, [dispatch, canFetch, oldestStoryId, networkStatus, pageStatus]);

  React.useEffect(() => {
    if (scrolledToBottom) {
      dispatch(pageForward(pageSize));
    }
  }, [dispatch, pageSize, scrolledToBottom, stories.length]);

  return stories;
}

function useMaxItemId() {
  const dispatch = useDispatch();
  const maxItemId = useSelector(selectMaxItemId);

  React.useEffect(() => {
    if (!maxItemId) {
      dispatch(fetchMaxItem());
    }
  }, [dispatch, maxItemId]);
}
