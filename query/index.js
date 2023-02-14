const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const posts = {};

// Example data structure
// posts === {
//   "s12344": {
//     id: "s12344",
//     title: "post title",
//     comments: [
//       {id: "dfb3r", content: "comment!"}
//     ]
//   }
// }

const PORT = 4002;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    // insert incoming data to obj for storing
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    //update all properties
    comment.status = status;
    comment.content = content;
  }


  res.send({});
});

app.listen(PORT, () => {
  console.log("Listening on", PORT, "QUERY routes");
});
