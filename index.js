const express = require('express');

const postRouter = require("./post-router")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers });
  });

server.use("/api/posts", postRouter);

server.listen(2000, () => console.log('API running on port 2000'));