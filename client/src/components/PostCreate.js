import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(process.env.REACT_APP_POSTS_URL, {
      title,
    });

    setTitle("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mt-4" controlId="formGroupEmail">
          <Form.Label>Create a New Post</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Sibmit
        </Button>
      </Form>
      <hr className="border-2 border-top "></hr>
    </Container>
  );
}

export default PostCreate;
