const express = require('express');

const postRouter = express.Router(); // notice the Uppercase R

const db = require('./data/db')

postRouter.get('/', (req, res) => {
  db.find(req.query)
    .then(post => {
      res.status(200).json(post);
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
  db.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(201).json(post)
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."})
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
  });

postRouter.get('/:id/comments', (req, res) => {
  db.findCommentById(req.params.id)
    .then(post => {
      if(post) {
        res.status(201).json(post)
      } else {
        res.status(404).json({message: "The post with the specified ID does not exist."});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved."
      })
    })
});

postRouter.post('/', (req, res) => {
  db.insert(req.body)
  if (req.body.title && req.body.contents) {
    db.insert(req.body)
    .then((id) => {
      db.findById(id)
      .then((post) => {
        res.status(201).json(post);
      })
    })
    .catch((error) => {
      console.log({ error });
      res.status(500).json({
        errorMessage: "Please provide title and contents for the post."
      })
    })
  }

});

postRouter.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(post => {
    if (post > 0 ) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post could not be removed"
    })
  })
});

postRouter.put('/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params,id, changes)
  .then(post => {
    if( post ) {
      res.status(201).json(post);
    } else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      error: "The post information could not be modified."
    });
  });
}); //not finished yet

postRouter.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const newComment = req.body;

  if(id !== newComment.id) {
    res.status(404).json({message: "The post with the specified ID does not exist."})
  } else {
    db.insertComment(newComment)
    .then(posts => {
        if(!newComment.text) {
          res.status(400).json({message: "Please provide text for the comment"})
        } else {
          res.status(201).json(posts);
        }
    })
    .catch(error => {
      console.log(error);
      console.log(newComment, 'the comment that failed')
      res.status(500).json({error: "There was an error while saving the comment to the database"})
    })
  }

})


module.exports = postRouter;