const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const PORT = 4002;
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

const handleEvents = (type, data) => {
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
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);

  res.send({});
});

app.listen(PORT, async () => {
  console.log("Listening on", PORT, "QUERY routes");

  try {
    const res = await axios.get(process.env.EVENT_BUS_URL);

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvents(event.type, event.data);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});
