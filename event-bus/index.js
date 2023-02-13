const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const PORT = 4005;

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post(process.env.POSTS_URL, event).catch((err) => {
    console.warn("unable sent event to POST url", err.message);
  });
  axios.post(process.env.COMMENTS_URL, event).catch((err) => {
    console.warn("unable sent event to COMMENTS url", err.message);
  });
  axios.post(process.env.QUERY_URL, event).catch((err) => {
    console.warn("unable sent event to QUERY url", err.message);
  });;

  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log("Listening on", PORT, "event-bus");
  
});
