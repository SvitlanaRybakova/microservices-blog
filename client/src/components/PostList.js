import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import PostCard from "./PostCard";

const PostList = ({ createdPost }) => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(process.env.REACT_APP_QUERY_URL);

      setPosts(response.data);
    };
    fetchData();
  }, [createdPost]);

  return (
    <Container>
      <h4 className="mb-4">All created posts</h4>
      <div className="d-flex flex-row flex-wrap">
        {Object.values(posts) &&
          Object.values(posts).map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              id={post.id}
              comments={post.comments}
            />
          ))}
      </div>
    </Container>
  );
};

export default PostList;
