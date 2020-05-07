const express = require('express');

const postRouter = require("./post-router")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers });
  });

server.use("/api/posts", postRouter);

const port = process.env.PORT || 5000;//this is how we make the port enviorment dynamic!
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
