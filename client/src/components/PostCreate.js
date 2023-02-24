import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

function PostCreate({ isPostCreated }) {
  const [title, setTitle] = useState("");

  const url = `${process.env.REACT_APP_POSTS_URL}/create`;
  console.log("URL", url);
  console.log("url1", `${process.env.REACT_APP_POSTS_URL}/create`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(url, {
      title,
    });
    isPostCreated((prevState) => !prevState);
    setTitle("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mt-4" controlId="formGroupEmail">
          <Form.Label>Create a Post!</Form.Label>
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
