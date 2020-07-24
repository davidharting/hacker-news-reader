import React from "react";
import { Story } from "models/story";

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
      <div>
        <i>{story.by}</i>
      </div>
    </div>
  );
}

interface StoryProps {
  story: Story;
}

export default ShowStory;
