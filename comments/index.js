const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const PORT = 4001;
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;

  // looking comments in existing post
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[postId] = comments;

  await axios.post(process.env.EVENT_BUS_URL, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Received Event (comments routes)", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios.post(process.env.EVENT_BUS_URL, {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }
  res.send({});
});

app.listen(PORT, () => {
  console.log("Listening on", PORT, "comments");
});
