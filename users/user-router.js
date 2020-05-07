  
// const router = require("express").Router();
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const users = require('./user-model');
// const session = require('express-session');

router.post("/register", (req, res) => {
  // const { }
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  users.add(user)
    .then(user => {
      res.json(user);
    }).catch(error => {
      console.log(error);
  }) 
})

router.post("/login", (req, res) => {
      const { username, password } = req.body;
    users.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({message: `Welcome ${user.username}`})
      } else {
        res.status(401).json({ message: 'Invalid credentials !' });
      }
    
    }).catch(error => {
      console.log(error);
  })
})
router.get("/users", (req, res) => {
  users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
const restricted = (req, res, next)=>{
  const { username, password } = req.header;
  if (username && password) {
    next();
  }
  res.json({ message: "please login, first !" });
}

module.exports = router;