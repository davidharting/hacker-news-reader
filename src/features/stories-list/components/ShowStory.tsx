import React from "react";
import { Story } from "models/story";

function ShowStory({ story }: StoryProps) {
  return (
    <div>
      <a href={story.url}>
        <div dangerouslySetInnerHTML={{ __html: story.title }} />
        <div>{story.by}</div>
      </a>
    </div>
  );
}

interface StoryProps {
  story: Story;
}

export default ShowStory;
