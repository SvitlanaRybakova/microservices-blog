import React from "react";
import { Card, Button } from "react-bootstrap";
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostCard = ({ id, title }) => {
  return (
    <Card style={{ width: "18rem", marginRight: "15px" }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <CommentsList id={id} />
        <hr className="border-2 border-top "></hr>
        <CommentCreate id={id} />
      </Card.Body>
    </Card>
  );
};

export default PostCard;
