const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const PORT = 4003;
const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
   
    await axios
      .post(process.env.EVENT_BUS_URL, {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => {
        console.warn(
          "unable sent the moderated content to EVENT_BUS_url",
          err.message
        );
      });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log("Listening on", PORT, "moderation service");
});
