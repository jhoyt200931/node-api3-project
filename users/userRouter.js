const express = require('express');
const userDb = require('./userDb.js');
const postDb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  const user = req.body;
  userDb.insert(user)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'There was an error saving user to the database'});
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const post = req.body;
  postDb.insert(post)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'There was an error saving the post to the database'});
    });
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'There was an error getting users from the database'});
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  if(req.user) {
    console.log(req.user);
    res.status(200).json(req.user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  userDb.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({message: 'There was an error getting posts for this user'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  userDb.remove(id)
    .then(response => {
      console.log(response);
      res.status(200).json({message: 'This user was deleted'})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'This user could not be deleted'});
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  const { id } = req.params;
  const changes = req.body;
  
  userDb.update(id, changes)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'There was an error updating this user'});
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  userDb.getById(id)
    .then(id => {
      if(id){
        req.user = id;
        next();
      } else {
        res.status(400).json({message: 'invalid user id'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'There was an error validating user Id'});
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const body = req.body;
  if(body){
    if(!body.name) {
      res.status(400).json({message: 'missing required name field'});
    } else {
      next();
    }
  } else {
    res.status(400).json({ message: 'missing user data' })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  if(body) {
    if(!body.text) {
      res.status(400).json({message: 'missing required text field'});
    } else {
      next();
    }
  } else {
    res.status(400).json({message: 'missing post data'})
  }
}

module.exports = router;
