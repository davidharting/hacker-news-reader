import React from "react";
import { Story } from "models/story";
import styles from "./story.module.css";

function ShowStory({ story }: StoryProps) {
  return (
    <div className="card">
      <a
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
        dangerouslySetInnerHTML={{ __html: story.title }}
      />
      <br />
      <br />
      <div className={styles.byline}>
        <span>{story.by}</span>
        <span>{presentDate(story.time)}</span>
      </div>
    </div>
  );
}

interface StoryProps {
  story: Story;
}

export default ShowStory;

function presentDate(unixEpochSeconds: number): string {
  const date = new Date(unixEpochSeconds * 1000);
  return date.toLocaleString();
}
