import React from "react";

export function useNetworkStatus(): NetworkStatus {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);

  const onOnline = () => {
    setIsOnline(true);
  };

  const onOffline = () => {
    setIsOnline(false);
  };

  React.useEffect(() => {
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  });

  return isOnline ? "online" : "offline";
}

type NetworkStatus = "online" | "offline";
