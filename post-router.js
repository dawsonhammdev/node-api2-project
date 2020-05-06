const express = require('express');

const postRouter = express.Router(); // notice the Uppercase R

postRouter.get('/', (req, res) => {
  postRouter.find(req.query)
    .then(post => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'error: The posts information could not be retrieved.',
      });
    });
  });

postRouter.get('/:id', (req, res) => {
  res.status(200).send('hello from the GET /users/:id endpoint');
});

postRouter.post('/', (req, res) => {
  res.status(200).send('hello from the POST /users endpoint');
});



module.exports = postRouter; // standard convention dictates that this is the last line on the file