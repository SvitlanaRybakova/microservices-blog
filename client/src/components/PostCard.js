import React from "react";
import { Card } from "react-bootstrap";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostCard = ({ id, title, comments }) => {
  return (
    <Card style={{ width: "18rem", marginRight: "15px" }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <CommentsList comments={comments} />
        <hr className="border-2 border-top "></hr>
        <CommentCreate id={id} />
      </Card.Body>
    </Card>
  );
};

export default PostCard;
