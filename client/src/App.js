import React from "react";
import Navigation from "./components/Navigation";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

function App() {
  return (
    <>
      <Navigation />
      <PostCreate />
      <PostList />
    </>
  );
}
export default App;
