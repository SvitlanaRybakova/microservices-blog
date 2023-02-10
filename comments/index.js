const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const PORT = 4001;
const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;
  
  // looking comments in existing post
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });
  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log("Listening on", PORT);
});
