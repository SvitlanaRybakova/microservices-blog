import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const CommentCreate = ({ id }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${process.env.REACT_APP_COMMENTS_URL+id}/comments`, {
      content: comment,
    });

    setComment("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
        />
      </Form.Group>
      <Button variant="info" type="submit">
        Send Comment
      </Button>
    </Form>
  );
};

export default CommentCreate;
