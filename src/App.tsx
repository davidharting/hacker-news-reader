import React from "react";
import StoriesList from "features/stories-list/StoriesList";

function App() {
  return (
    <div>
      <h1>Hacker News Reader</h1>
      <StoriesList pageSize={12} />
    </div>
  );
}

export default App;
