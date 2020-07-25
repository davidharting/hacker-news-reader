import React from "react";

export function useScrolledToBottom(): boolean {
  const [scrolledToBottom, setScrolledToBottom] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      console.log("scrolling");
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setScrolledToBottom(true);
      } else {
        setScrolledToBottom(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrolledToBottom;
}
