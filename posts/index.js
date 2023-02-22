const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// app.get("/posts", (req, res) => {
//   res.send(posts);
// });

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post(process.env.EVENT_BUS_URL, {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event (post routes)", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log("The latest version 3.0");
  console.log("Listening on", PORT, "posts");
});
