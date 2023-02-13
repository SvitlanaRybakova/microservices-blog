import React, {useState} from "react";
import Navigation from "./components/Navigation";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";

function App() {
  const [createdPost, isPostCreated] = useState(false)
  return (
    <>
      <Navigation />
      <PostCreate isPostCreated={isPostCreated} />
      <PostList createdPost={createdPost} />
    </>
  );
}
export default App;
