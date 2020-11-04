const express = require('express');
const userDb = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
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
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
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
